export type Protocol = 'x402' | 'mpp' | 'acp' | 'other';
export type Category = 'data' | 'trading' | 'ai-ml' | 'identity' | 'social' | 'infra';
export type VoterType = 'erc8004' | 'worldid' | 'wallet';
export type ServiceStatus = 'pending' | 'verified' | 'rejected';

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  url: string;
  protocol: Protocol;
  category: Category;
  priceText: string;
  network: string;
  agentUpvotes: number;
  humanUpvotes: number;
  worldidUpvotes?: number; // Optional for now, used in dbGetVoteCounts
  submittedAt: string;
  verified: boolean;
  exampleRequest?: string; // Example curl or code snippet
  exampleResponse?: string; // Example JSON response
  exampleCost?: string; // Cost per call
  rateLimit?: string; // Rate limit info
}
