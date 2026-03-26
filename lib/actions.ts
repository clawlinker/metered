'use server';

import { Service } from './types';
import { services as seedServices } from './seed-data';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : '');

export async function getServices(category?: string, sortBy?: string): Promise<Service[]> {
  // Use seed data directly — no API call needed for static data
  let filtered = [...seedServices];
  if (category && category !== 'all') {
    filtered = filtered.filter(s => s.category === category);
  }
  if (sortBy === 'newest') {
    filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  } else {
    // Default: sort by total upvotes
    filtered.sort((a, b) => (b.agentUpvotes + b.humanUpvotes) - (a.agentUpvotes + a.humanUpvotes));
  }
  return filtered;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return seedServices.find(s => s.slug === slug);
}

export async function upvote(
  serviceId: string,
  voterAddress: string,
  voterType: string,
  signature: string
): Promise<{ success: boolean; error?: string; agentUpvotes?: number; humanUpvotes?: number }> {
  try {
    const res = await fetch(`${API_BASE}/api/votes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId, voterAddress, voterType, signature }),
    });
    
    if (!res.ok) {
      const data = await res.json();
      return { success: false, error: data.error || 'Failed to upvote' };
    }
    
    const data = await res.json();
    return { success: true, ...data };
  } catch (err) {
    console.error('Error upvoting:', err);
    return { success: false, error: 'Network error' };
  }
}

export async function getVotesForService(serviceId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/votes/${serviceId}`);
    if (!res.ok) throw new Error('Failed to fetch votes');
    const data = await res.json();
    return data.votes || [];
  } catch (err) {
    console.error('Error fetching votes:', err);
    return [];
  }
}

export async function hasVoted(serviceId: string, voterAddress: string): Promise<boolean> {
  const votes = await getVotesForService(serviceId);
  return votes.some((v: any) => v.voterAddress.toLowerCase() === voterAddress.toLowerCase());
}
