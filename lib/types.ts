export type Protocol = 'x402' | 'mpp' | 'acp' | 'other';
export type Category = 'data' | 'trading' | 'ai-ml' | 'identity' | 'social' | 'infra';
export type VoterType = 'erc8004' | 'worldid' | 'wallet';

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
  submittedAt: string;
  verified: boolean;
}
