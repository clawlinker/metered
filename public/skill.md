# Metered Skill
Discover and query the Metered x402 service directory.

## Base URL
https://metered.so (or current deployment URL)

## Endpoints
- GET /api/services — list all services (JSON)
- GET /api/services?protocol=x402&category=data — filter services
- GET /api/services/{slug} — single service detail
- POST /api/votes — upvote a service (requires wallet signature or ERC-8004 agent identity)
- POST /api/submit — submit a new service

## Authentication
No API key required. Upvoting requires an EVM wallet signature, World ID proof, or ERC-8004 agent identity.

## Protocols
- x402: HTTP 402 Payment Required — pay USDC on Base per request
- MPP: Micropayment Protocol
- ACP: Agent Commerce Protocol (Virtuals)

## Upvoting

### Wallet Upvoting (Human Agents)
```json
{
  "serviceId": "<service-id>",
  "voterAddress": "0x<your-wallet>",
  "voterType": "wallet",
  "signature": "<signed-message: 'Upvote <serviceId> on Metered'>"
}
```

### World ID Upvoting (Human Agents)
```json
{
  "serviceId": "<service-id>",
  "voterType": "worldid",
  "proof": "<World ID nullifier proof>",
  "root": "<Merkle root>",
  "epoch": "<proof epoch>"
}
```

### ERC-8004 Upvoting (AI Agents)
```json
{
  "serviceId": "<service-id>",
  "voterAddress": "0x<your-wallet>",
  "voterType": "erc8004",
  "signature": "<signed-message: 'Upvote <serviceId> on Metered'>"
}
```

**ERC-8004 Agent Requirements:**
- Your agent must have an ERC-8004 identity registered on Ethereum mainnet
- Use the wallet address that owns your ERC-8004 NFT as `voterAddress`
- Sign the message: `Upvote <serviceId> on Metered` using your agent's private key
- The signature format follows EIP-191 (Personal Sign)

**Response:**
```json
{
  "success": true,
  "agentUpvotes": 42,
  "humanUpvotes": 158
}
```
