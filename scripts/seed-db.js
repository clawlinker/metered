const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

async function main() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE services (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      url TEXT NOT NULL,
      protocol TEXT NOT NULL,
      category TEXT NOT NULL,
      priceText TEXT NOT NULL,
      network TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      submittedAt TEXT NOT NULL,
      verified INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      serviceId TEXT NOT NULL,
      voterAddress TEXT NOT NULL,
      voterType TEXT NOT NULL DEFAULT 'wallet',
      signature TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      UNIQUE(serviceId, voterAddress),
      FOREIGN KEY (serviceId) REFERENCES services(id)
    );

    CREATE TABLE meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Seed services
  const seedServices = [
    {id: 'checkr', name: 'Checkr', slug: 'checkr', description: 'Real-time X/Twitter attention intelligence for Base chain tokens. Track what\'s trending on CT with attention/price divergence signals.', url: 'https://checkr.lol', protocol: 'x402', category: 'data', priceText: '$0.01-0.05/call', network: 'Base', submittedAt: '2026-02-05', verified: 1},
    {id: 'pawr-link', name: 'pawr.link', slug: 'pawr-link', description: 'Link-in-bio solution that works for both humans and AI agents. Create curated agent profiles with x402 microtransactions.', url: 'https://www.pawr.link', protocol: 'x402', category: 'identity', priceText: '$9-$10 (profiles), $0.10 (updates)', network: 'Base', submittedAt: '2026-02-10', verified: 1},
    {id: 'bazaar', name: 'Bazaar', slug: 'bazaar', description: 'x402 service marketplace and aggregator. Discover and integrate paid APIs with micropayments.', url: 'https://bazaar.computer', protocol: 'x402', category: 'infra', priceText: 'varies', network: 'Base', submittedAt: '2026-03-01', verified: 1},
    {id: 'coinbase-cdp', name: 'Coinbase CDP', slug: 'coinbase-cdp', description: 'Coinbase Developer Platform with x402 facilitator for payment processing and wallet management.', url: 'https://docs.cdp.coinbase.com', protocol: 'x402', category: 'identity', priceText: 'varies', network: 'Ethereum', submittedAt: '2026-02-28', verified: 1},
    {id: 'zerion-api', name: 'Zerion API', slug: 'zerion-api', description: 'Access real-time portfolio data, token prices, and blockchain analytics through Zerion\'s developer API.', url: 'https://developers.zerion.io', protocol: 'x402', category: 'data', priceText: '$0.01/req', network: 'Base', submittedAt: '2026-01-22', verified: 1},
    {id: 'mercuryclaw', name: 'Mercuryclaw', slug: 'mercuryclaw', description: 'Crypto market data API with real-time pricing, orderbook depth, and trading volume for major exchanges.', url: 'https://mercuryclaw.xyz', protocol: 'x402', category: 'data', priceText: '$0.10/req', network: 'Base', submittedAt: '2026-02-14', verified: 1},
    {id: 'hyperbolic-gpu', name: 'Hyperbolic GPU', slug: 'hyperbolic-gpu', description: 'Affordable LLM inference and training on GPU clusters. Pay per token processed via x402 microtransactions.', url: 'https://hyperbolic.xyz', protocol: 'x402', category: 'ai-ml', priceText: 'varies', network: 'Base', submittedAt: '2026-02-20', verified: 1},
    {id: 'coingecko', name: 'CoinGecko', slug: 'coingecko', description: 'Comprehensive crypto market data including prices, volumes, exchange stats, and community metrics.', url: 'https://www.coingecko.com/en/api', protocol: 'mpp', category: 'data', priceText: 'varies', network: 'Tempo', submittedAt: '2026-01-15', verified: 1},
    {id: 'tangle-network', name: 'Tangle Network', slug: 'tangle-network', description: 'Decentralized messaging and data broadcasting protocol with low-cost message publishing.', url: 'https://tangle.network', protocol: 'x402', category: 'infra', priceText: 'varies', network: 'Base', submittedAt: '2026-02-01', verified: 1},
    {id: 'orthogonal-skills', name: 'Orthogonal Skills', slug: 'orthogonal-skills', description: 'AI agent skills marketplace for building autonomous capabilities. Pay per skill invocation.', url: 'https://orthogonalskills.ai', protocol: 'x402', category: 'ai-ml', priceText: 'varies', network: 'Base', submittedAt: '2026-02-18', verified: 1}
  ];

  for (const s of seedServices) {
    db.run('INSERT INTO services (id, name, slug, description, url, protocol, category, priceText, network, submittedAt, verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [s.id, s.name, s.slug, s.description, s.url, s.protocol, s.category, s.priceText, s.network, s.submittedAt, s.verified]);
  }

  // Seed votes
  const seedVotes = [
    {id: 'checkr', agent: 156, human: 342},
    {id: 'pawr-link', agent: 42, human: 128},
    {id: 'bazaar', agent: 89, human: 203},
    {id: 'coinbase-cdp', agent: 67, human: 156},
    {id: 'zerion-api', agent: 28, human: 89},
    {id: 'mercuryclaw', agent: 73, human: 156},
    {id: 'hyperbolic-gpu', agent: 89, human: 67},
    {id: 'coingecko', agent: 45, human: 178},
    {id: 'tangle-network', agent: 34, human: 56},
    {id: 'orthogonal-skills', agent: 67, human: 23}
  ];

  for (const s of seedVotes) {
    for (let i = 0; i < s.agent; i++) {
      db.run('INSERT INTO votes (serviceId, voterAddress, voterType, signature, timestamp) VALUES (?, ?, ?, ?, ?)', 
        [s.id, '0xseed' + i.toString().padStart(36, '0'), 'erc8004', 'seed_sig_' + i, Date.now()]);
    }
    for (let i = 0; i < s.human; i++) {
      db.run('INSERT INTO votes (serviceId, voterAddress, voterType, signature, timestamp) VALUES (?, ?, ?, ?, ?)', 
        [s.id, '0xhuman' + i.toString().padStart(36, '0'), 'wallet', 'seed_sig_' + i, Date.now()]);
    }
  }

  // Verify
  const result = db.exec('SELECT * FROM services LIMIT 3');
  console.log('Services count:', result[0].values.length);

  const votes = db.exec('SELECT serviceId, COUNT(*) as cnt FROM votes GROUP BY serviceId');
  console.log('Votes by service:', votes[0].values.map(v => v[0] + ':' + v[1]));

  // Export
  const out = db.export();
  fs.writeFileSync('/root/metered/data/services.db', out);
  console.log('Database created with seed data and votes!');
}

main().catch(console.error);
