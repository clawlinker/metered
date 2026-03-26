'use server';

import { Service } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

export async function getServices(category?: string, sortBy?: string): Promise<Service[]> {
  let url = `${API_BASE}/api/services`;
  if (category) {
    url += `?category=${category}`;
  }
  if (sortBy) {
    url += `&sortBy=${sortBy}`;
  }
  
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch services');
    const data = await res.json();
    return data.services || [];
  } catch (err) {
    console.error('Error fetching services:', err);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  try {
    const res = await fetch(`${API_BASE}/api/services/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) return undefined;
      throw new Error('Failed to fetch service');
    }
    const data = await res.json();
    return data.service;
  } catch (err) {
    console.error('Error fetching service:', err);
    return undefined;
  }
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
