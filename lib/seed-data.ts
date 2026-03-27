import { Service, Protocol, Category } from './types';

export const services: Service[] = [
  {
    id: 'checkr',
    name: 'Checkr',
    slug: 'checkr',
    description: 'Real-time X/Twitter attention intelligence for Base chain tokens. Track what\'s trending on CT with attention/price divergence signals.',
    url: 'https://checkr.lol',
    protocol: 'x402',
    category: 'data',
    priceText: '$0.01-0.05/call',
    network: 'Base',
    agentUpvotes: 156,
    humanUpvotes: 342,
    submittedAt: '2026-02-05',
    verified: true,
    exampleRequest: `curl -X GET "https://checkr.lol/api/attention?token=PEPE" \\
  -H "X-Payment: <x402-payment-header>"`,
    exampleResponse: `{
  "token": "PEPE",
  "attention_score": 8.5,
  "mentions_1h": 342,
  "sentiment": "bullish",
  "price_change_24h": 2.3
}`,
    exampleCost: '$0.01 per call via x402',
  },
  {
    id: 'pawr-link',
    name: 'pawr.link',
    slug: 'pawr-link',
    description: 'Link-in-bio solution that works for both humans and AI agents. Create curated agent profiles with x402 microtransactions.',
    url: 'https://www.pawr.link',
    protocol: 'x402',
    category: 'identity',
    priceText: '$9-$10 (profiles), $0.10 (updates)',
    network: 'Base',
    agentUpvotes: 42,
    humanUpvotes: 128,
    submittedAt: '2026-02-10',
    verified: true,
    exampleRequest: `curl -X POST "https://www.pawr.link/api/x402/create-profile" \\
  -H "Content-Type: application/json" \\
  -H "X-Payment: <x402-payment-header>" \\
  -d '{"username":"myagent","links":[{"label":"Twitter","url":"https://x.com/myagent"}]}'`,
    exampleResponse: `{
  "success": true,
  "profileUrl": "https://www.pawr.link/myagent",
  "avatarUrl": "https://www.pawr.link/myagent-avatar.png"
}`,
    exampleCost: '$9 self-service, $10 curated',
  },
  {
    id: 'bazaar',
    name: 'Bazaar',
    slug: 'bazaar',
    description: 'x402 service marketplace and aggregator. Discover and integrate paid APIs with micropayments.',
    url: 'https://bazaar.computer',
    protocol: 'x402',
    category: 'infra',
    priceText: 'varies',
    network: 'Base',
    agentUpvotes: 89,
    humanUpvotes: 203,
    submittedAt: '2026-03-01',
    verified: true,
    exampleRequest: `curl -X GET "https://bazaar.computer/api/services?protocol=x402" \\
  -H "X-Payment: <x402-payment-header>"`,
    exampleResponse: `{
  "services": [
    {
      "name": "Checkr",
      "protocol": "x402",
      "price": "$0.01-0.05",
      "category": "data"
    }
  ],
  "total": 89,
  "page": 1
}`,
    exampleCost: 'Varies per service — free to discover via x402',
  },
  {
    id: 'coinbase-cdp',
    name: 'Coinbase CDP',
    slug: 'coinbase-cdp',
    description: 'Coinbase Developer Platform with x402 facilitator for payment processing and wallet management.',
    url: 'https://docs.cdp.coinbase.com',
    protocol: 'x402',
    category: 'identity',
    priceText: 'varies',
    network: 'Ethereum',
    agentUpvotes: 67,
    humanUpvotes: 156,
    submittedAt: '2026-02-28',
    verified: true,
    exampleRequest: `curl -X POST "https://api.cdp.coinbase.com/v1/wallets" \\
  -H "Authorization: Bearer <your-api-key>" \\
  -H "X-Payment: <x402-payment-header>"`,
    exampleResponse: `{
  "walletId": "wallet_123abc",
  "address": "0x1234...5678",
  "createdAt": "2026-03-26T12:00:00Z"
}`,
    exampleCost: '$0.001 per wallet operation',
  },
  {
    id: 'zerion-api',
    name: 'Zerion API',
    slug: 'zerion-api',
    description: 'Access real-time portfolio data, token prices, and blockchain analytics through Zerion\'s developer API.',
    url: 'https://developers.zerion.io',
    protocol: 'x402',
    category: 'data',
    priceText: '$0.01/req',
    network: 'Base',
    agentUpvotes: 28,
    humanUpvotes: 89,
    submittedAt: '2026-01-22',
    verified: true,
    exampleRequest: `curl -X GET "https://api.zerion.io/v1/portfolios/0x123..." \\
  -H "Authorization: Bearer <your-api-key>" \\
  -H "X-Payment: <x402-payment-header>"`,
    exampleResponse: `{
  "portfolio": {
    "totalValue": "$12,456.78",
    "assets": [
      {"token": "ETH", "balance": "2.5", "value": "$5,200"},
      {"token": "USDC", "balance": "1000", "value": "$1,000"}
    ]
  }
}`,
    exampleCost: '$0.01 per request via x402',
  },
  {
    id: 'mercuryclaw',
    name: 'Mercuryclaw',
    slug: 'mercuryclaw',
    description: 'Crypto market data API with real-time pricing, orderbook depth, and trading volume for major exchanges.',
    url: 'https://mercuryclaw.xyz',
    protocol: 'x402',
    category: 'data',
    priceText: '$0.10/req',
    network: 'Base',
    agentUpvotes: 73,
    humanUpvotes: 156,
    submittedAt: '2026-02-14',
    verified: true,
    exampleRequest: `curl -X GET "https://api.mercuryclaw.xyz/v1/markets/BTC-USD" \\
  -H "X-Payment: <x402-payment-header>"`,
    exampleResponse: `{
  "symbol": "BTC-USD",
  "price": "$68,947.23",
  "volume24h": "$2,486.1M",
  "openInterest": "$1.8B",
  "fundingRate": "0.0013%"
}`,
    exampleCost: '$0.10 per request via x402',
  },
  {
    id: 'hyperbolic-gpu',
    name: 'Hyperbolic GPU',
    slug: 'hyperbolic-gpu',
    description: 'Affordable LLM inference and training on GPU clusters. Pay per token processed via x402 microtransactions.',
    url: 'https://hyperbolic.xyz',
    protocol: 'x402',
    category: 'ai-ml',
    priceText: 'varies',
    network: 'Base',
    agentUpvotes: 89,
    humanUpvotes: 67,
    submittedAt: '2026-02-20',
    verified: true,
    exampleRequest: `curl -X POST "https://api.hyperbolic.xyz/v1/completions" \\
  -H "Authorization: Bearer <your-api-key>" \\
  -H "X-Payment: <x402-payment-header>" \\
  -d '{"model": "claude-3.5-sonnet", "prompt": "Write a function"}'`,
    exampleResponse: `{
  "id": "cmpl-123abc",
  "choices": [
    {
      "text": "Here is your function...",
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 45
  }
}`,
    exampleCost: 'Varies — $0.0001-0.01 per 1K tokens',
  },
  {
    id: 'coingecko',
    name: 'CoinGecko',
    slug: 'coingecko',
    description: 'Comprehensive crypto market data including prices, volumes, exchange stats, and community metrics.',
    url: 'https://www.coingecko.com/en/api',
    protocol: 'mpp',
    category: 'data',
    priceText: 'varies',
    network: 'Tempo',
    agentUpvotes: 45,
    humanUpvotes: 178,
    submittedAt: '2026-01-15',
    verified: true,
    exampleRequest: `curl -X GET "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd" \\
  -H "Authorization: Bearer <your-api-key>"`,
    exampleResponse: `{
  "bitcoin": {
    "usd": 68947.23
  }
}`,
    exampleCost: 'Free tier available, premium via MPP',
  },
  {
    id: 'tangle-network',
    name: 'Tangle Network',
    slug: 'tangle-network',
    description: 'Decentralized messaging and data broadcasting protocol with low-cost message publishing.',
    url: 'https://tangle.network',
    protocol: 'x402',
    category: 'infra',
    priceText: 'varies',
    network: 'Base',
    agentUpvotes: 34,
    humanUpvotes: 56,
    submittedAt: '2026-02-01',
    verified: true,
    exampleRequest: `curl -X POST "https://api.tangle.network/v1/messages" \\
  -H "X-Payment: <x402-payment-header>" \\
  -d '{"topic": "crypto", "content": "Hello world"}'`,
    exampleResponse: `{
  "messageId": "msg_123abc",
  "timestamp": "2026-03-27T02:00:00Z",
  "blockHash": "0xabc123..."
}`,
    exampleCost: '$0.001 per message via x402',
  },
  {
    id: 'orthogonal-skills',
    name: 'Orthogonal Skills',
    slug: 'orthogonal-skills',
    description: 'AI agent skills marketplace for building autonomous capabilities. Pay per skill invocation.',
    url: 'https://orthogonalskills.ai',
    protocol: 'x402',
    category: 'ai-ml',
    priceText: 'varies',
    network: 'Base',
    agentUpvotes: 67,
    humanUpvotes: 23,
    submittedAt: '2026-02-18',
    verified: true,
    exampleRequest: `curl -X POST "https://api.orthogonalskills.ai/v1/skills/run" \\
  -H "Authorization: Bearer <your-api-key>" \\
  -H "X-Payment: <x402-payment-header>" \\
  -d '{"skillId": "search-web", "input": "latest AI news"}'`,
    exampleResponse: `{
  "taskId": "task_123abc",
  "status": "completed",
  "result": {
    "summary": "Latest AI news...",
    "sources": ["x.com", "hackernews"]
  }
}`,
    exampleCost: 'Varies per skill — $0.01-0.50 per invocation',
  },
];

export const categories: Category[] = ['data', 'trading', 'ai-ml', 'identity', 'social', 'infra'];

export const categoryLabels: Record<Category, string> = {
  data: 'Data',
  trading: 'Trading',
  'ai-ml': 'AI/ML',
  identity: 'Identity',
  social: 'Social',
  infra: 'Infra',
};

export const protocols: Protocol[] = ['x402', 'mpp', 'acp', 'other'];
export const protocolLabels: Record<Protocol, string> = {
  x402: 'x402',
  mpp: 'MPP',
  acp: 'ACP',
  other: 'Other',
};
