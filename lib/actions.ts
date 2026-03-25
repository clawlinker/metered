'use server';

import { dbGetServices, dbAddVote, dbGetVotesForService, dbHasVoted, dbGetVoteCounts, ServiceRow } from './db';
import { Service } from './types';

function rowToService(row: ServiceRow): Service {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    url: row.url,
    protocol: row.protocol as Service['protocol'],
    category: row.category as Service['category'],
    priceText: row.priceText,
    network: row.network,
    submittedAt: row.submittedAt,
    verified: row.verified === 1,
    agentUpvotes: row.agentUpvotes,
    humanUpvotes: row.humanUpvotes,
  };
}

export async function getServices(category?: string, sortBy?: string): Promise<Service[]> {
  const rows = await dbGetServices(category);
  return rows.map(rowToService);
}

export async function upvote(
  serviceId: string,
  voterAddress: string,
  voterType: string,
  signature: string
): Promise<{ success: boolean; error?: string; agentUpvotes?: number; humanUpvotes?: number }> {
  const result = await dbAddVote(serviceId, voterAddress, voterType, signature);
  if (!result.success) {
    return result;
  }
  const counts = await dbGetVoteCounts(serviceId);
  return { success: true, ...counts };
}

export async function getVotesForService(serviceId: string) {
  return await dbGetVotesForService(serviceId);
}

export async function hasVoted(serviceId: string, voterAddress: string): Promise<boolean> {
  return await dbHasVoted(serviceId, voterAddress);
}
