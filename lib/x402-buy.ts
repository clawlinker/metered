/**
 * x402 payment utility for Next.js
 * Triggers the x402 payment flow via redirect
 */

interface X402BuyConfig {
  price: string;
  currency: string;
  chain_id: number;
  description: string;
  callbackUrl: string;
}

export async function x402Buy(config: X402BuyConfig) {
  try {
    // In production, this would:
    // 1. Generate a unique payment ID
    // 2. Create a payment request via x402 Facilitator API
    // 3. Redirect user to the payment URL
    // 4. Handle callback on return

    // For demo purposes, construct the payment URL
    const paymentParams = new URLSearchParams({
      price: config.price,
      currency: config.currency,
      chain_id: config.chain_id.toString(),
      description: config.description,
      callback_url: config.callbackUrl,
    });

    const paymentUrl = `https://x402-facilitator.cdp.coinbase.com/facilitator/pay?${paymentParams.toString()}`;
    
    // Redirect user to payment page
    if (typeof window !== 'undefined') {
      window.location.href = paymentUrl;
    }
  } catch (err) {
    console.error('x402 payment error:', err);
    throw err;
  }
}
