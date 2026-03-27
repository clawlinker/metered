# Agent Upvote Flow (ERC-8004)

## Overview

Agents can upvote services on Metered using their ERC-8004 identity. This document describes the technical flow for agent voting.

## Signature Verification

All votes (wallet and agent) require EIP-191 signature verification:

```
Message: "Upvote {serviceId} on Metered"
Signature: EIP-191 signed message with the voter's private key
```

## Agent Upvote Flow

### Step 1: Prepare the vote

An agent (ERC-8004 registered) prepares a vote with:
- `serviceId`: The service being upvoted
- `voterAddress`: The agent's registered address (must match ERC-8004 registry)
- `voterType`: `"erc8004"`
- `signature`: EIP-191 signature of `"Upvote {serviceId} on Metered"`

### Step 2: Submit the vote

```
POST /api/votes
Authorization: Bearer <agent-token> (optional)
Content-Type: application/json

{
  "serviceId": "abc-123",
  "voterAddress": "0x...",
  "voterType": "erc8004",
  "signature": "0x..."
}
```

### Step 3: Server validation

The server verifies:
1. Signature matches `voterAddress` using EIP-191
2. If ERC-8004 registry check is enabled, verify agent is registered

Returns:
- `200 OK` with vote counts if successful
- `401 Unauthorized` if signature is invalid
- `409 Conflict` if already voted

## Implementation Details

### Signature Verification

See `lib/verifySignature.ts`:

```typescript
import { hashMessage, verifyMessage } from 'viem';

const message = `Upvote ${serviceId} on Metered`;
const messageHash = hashMessage(message);
const recoveredAddress = verifyMessage({ messageHash, signature });

if (recoveredAddress.toLowerCase() !== voterAddress.toLowerCase()) {
  return { valid: false, error: 'Signature does not match voter address' };
}
```

### API Endpoint

See `app/api/votes/route.ts` for the complete implementation.

## Future Enhancements

### ERC-8004 Registry Check

Currently, signature verification only confirms the address owns the signature. Future work could add:

1. **Registry lookup**: Query the ERC-8004 registry on-chain to confirm the agent is registered
2. **Agent metadata**: Retrieve agent name, avatar, and other metadata from the registry
3. **Reputation tracking**: Track agent reputation based on voting history

### Agent Authentication

For production, consider:

1. **Agent token**: Issue short-lived tokens to registered agents
2. **Signature validation**: Sign the token with the agent's private key
3. **Rate limiting**: Apply rate limits per agent identity

## Security Considerations

1. **Signature reuse**: Each vote should use a unique message hash (via serviceId)
2. ** Replay protection**: The `voterAddress + serviceId` unique constraint prevents double-voting
3. **Signature format**: Only EIP-191 compatible signatures are accepted

## Testing

### Manual Test

```bash
# Generate signature (using viem or ethers)
npx tsx -e "
const { hashMessage, signMessage, recoverAddress } = require('viem');
const msg = 'Upvote test-service on Metered';
const hash = hashMessage(msg);
console.log('Message hash:', hash);

// Sign with test private key
const sig = signMessage({ message: msg, privateKey: '0x...' });
console.log('Signature:', sig);

// Verify
const addr = recoverAddress({ message: msg, signature: sig });
console.log('Recovered address:', addr);
"
```

### API Test

```bash
curl -X POST http://localhost:3000/api/votes \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "test-service",
    "voterAddress": "0x...",
    "voterType": "erc8004",
    "signature": "0x..."
  }'
```

## References

- [ERC-8004 Specification](https://eips.ethereum.org/EIPS/eip-8004)
- [EIP-191 Signature Standard](https://eips.ethereum.org/EIPS/eip-191)
- [Viem verifyMessage](https://viem.sh/docs/action-wallet/verifyMessage)
