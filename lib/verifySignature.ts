import { decodeFunctionData, recoverMessageAddress, toHex } from 'viem';

/**
 * Verify an EIP-191 signature for a vote.
 * For wallet type: signature is EIP-191 signed message of "Upvote {serviceId} on Metered"
 * For erc8004 type: same, but the address must be an ERC-8004 registered agent
 */
export async function verifyVoteSignature(
  voterAddress: string,
  signature: string,
  serviceId: string
): Promise<{ valid: boolean; error?: string }> {
  try {
    // EIP-191 signable message format for votes
    const message = `Upvote ${serviceId} on Metered`;

    // Recover the address that signed the message
    const recoveredAddress = await recoverMessageAddress({ message, signature: toHex(signature) });

    if (recoveredAddress.toLowerCase() !== voterAddress.toLowerCase()) {
      return { valid: false, error: 'Signature does not match voter address' };
    }

    return { valid: true };
  } catch (err) {
    return { valid: false, error: 'Invalid signature format' };
  }
}
