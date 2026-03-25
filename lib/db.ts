import initSqlJs, { Database as SqlJsDatabase, SqlValue } from 'sql.js';
import path from 'path';
import fs from 'fs';
import { services as seedServices } from './seed-data';

let db: SqlJsDatabase | null = null;
let dbReady: Promise<SqlJsDatabase> | null = null;

async function getDb(): Promise<SqlJsDatabase> {
  if (db) return db;
  if (dbReady) return dbReady;

  dbReady = (async () => {
    // Locate the WASM binary — works in both dev and Vercel serverless
    let wasmBinary: ArrayBuffer | undefined;
    const wasmPaths = [
      path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm'),
      path.join(process.cwd(), 'public', 'sql-wasm.wasm'),
      path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm'),
    ];
    for (const p of wasmPaths) {
      try {
        const buf = fs.readFileSync(p);
        wasmBinary = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        break;
      } catch {
        // try next
      }
    }

    const SQL = await initSqlJs(wasmBinary ? { wasmBinary } : undefined);
    db = new SQL.Database();

    db.run(`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        url TEXT NOT NULL,
        protocol TEXT NOT NULL,
        category TEXT NOT NULL,
        priceText TEXT NOT NULL,
        network TEXT NOT NULL,
        submittedAt TEXT NOT NULL,
        verified INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serviceId TEXT NOT NULL,
        voterAddress TEXT NOT NULL,
        voterType TEXT NOT NULL DEFAULT 'wallet',
        signature TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        UNIQUE(serviceId, voterAddress),
        FOREIGN KEY (serviceId) REFERENCES services(id)
      );

      CREATE TABLE IF NOT EXISTS meta (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);

    // Seed if not already seeded
    const result = db.exec("SELECT value FROM meta WHERE key = 'seeded'");
    if (result.length === 0 || result[0].values.length === 0) {
      const stmt = db.prepare(
        `INSERT OR IGNORE INTO services (id, name, slug, description, url, protocol, category, priceText, network, submittedAt, verified)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );

      for (const s of seedServices) {
        stmt.run([s.id, s.name, s.slug, s.description, s.url, s.protocol, s.category, s.priceText, s.network, s.submittedAt, s.verified ? 1 : 0]);
      }
      stmt.free();

      db.run("INSERT INTO meta (key, value) VALUES ('seeded', '1')");
    }

    return db;
  })();

  return dbReady;
}

export interface ServiceRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  url: string;
  protocol: string;
  category: string;
  priceText: string;
  network: string;
  submittedAt: string;
  verified: number;
  agentUpvotes: number;
  humanUpvotes: number;
}

export interface VoteRow {
  id: number;
  serviceId: string;
  voterAddress: string;
  voterType: string;
  signature: string;
  timestamp: number;
}

function queryAll<T>(database: SqlJsDatabase, sql: string, params: SqlValue[] = []): T[] {
  const stmt = database.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const rows: T[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject() as T);
  }
  stmt.free();
  return rows;
}

function queryOne<T>(database: SqlJsDatabase, sql: string, params: SqlValue[] = []): T | undefined {
  const stmt = database.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  let row: T | undefined;
  if (stmt.step()) {
    row = stmt.getAsObject() as T;
  }
  stmt.free();
  return row;
}

export async function dbGetServices(category?: string): Promise<ServiceRow[]> {
  const database = await getDb();
  
  const baseQuery = `
    SELECT 
      s.*,
      COALESCE(SUM(CASE WHEN v.voterType = 'erc8004' THEN 1 ELSE 0 END), 0) as agentUpvotes,
      COALESCE(SUM(CASE WHEN v.voterType != 'erc8004' THEN 1 ELSE 0 END), 0) as humanUpvotes
    FROM services s
    LEFT JOIN votes v ON s.id = v.serviceId
    ${category && category !== 'all' ? 'WHERE s.category = ?' : ''}
    GROUP BY s.id
    ORDER BY (agentUpvotes + humanUpvotes) DESC
  `;

  if (category && category !== 'all') {
    return queryAll<ServiceRow>(database, baseQuery, [category]);
  }
  return queryAll<ServiceRow>(database, baseQuery);
}

export async function dbAddVote(
  serviceId: string,
  voterAddress: string,
  voterType: string,
  signature: string
): Promise<{ success: boolean; error?: string }> {
  const database = await getDb();
  
  try {
    database.run(
      `INSERT INTO votes (serviceId, voterAddress, voterType, signature, timestamp)
       VALUES (?, ?, ?, ?, ?)`,
      [serviceId, voterAddress.toLowerCase(), voterType, signature, Date.now()]
    );
    return { success: true };
  } catch (err: unknown) {
    const error = err as { message?: string };
    if (error?.message?.includes('UNIQUE constraint failed')) {
      return { success: false, error: 'Already voted' };
    }
    throw err;
  }
}

export async function dbGetVotesForService(serviceId: string): Promise<VoteRow[]> {
  const database = await getDb();
  return queryAll<VoteRow>(database, 'SELECT * FROM votes WHERE serviceId = ?', [serviceId]);
}

export async function dbHasVoted(serviceId: string, voterAddress: string): Promise<boolean> {
  const database = await getDb();
  const row = queryOne(database, 'SELECT 1 as found FROM votes WHERE serviceId = ? AND voterAddress = ?', [serviceId, voterAddress.toLowerCase()]);
  return !!row;
}

export async function dbGetVoteCounts(serviceId: string): Promise<{ agentUpvotes: number; humanUpvotes: number }> {
  const database = await getDb();
  const row = queryOne<{ agentUpvotes: number; humanUpvotes: number }>(
    database,
    `SELECT 
      COALESCE(SUM(CASE WHEN voterType = 'erc8004' THEN 1 ELSE 0 END), 0) as agentUpvotes,
      COALESCE(SUM(CASE WHEN voterType != 'erc8004' THEN 1 ELSE 0 END), 0) as humanUpvotes
    FROM votes WHERE serviceId = ?`,
    [serviceId]
  );
  return row || { agentUpvotes: 0, humanUpvotes: 0 };
}
