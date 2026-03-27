import { HTTPFacilitatorClient } from "@x402/core/server";
import { x402ResourceServer } from "@x402/next";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { facilitator } from "@coinbase/x402";
import {
  agentkitResourceServerExtension,
  createAgentBookVerifier,
  createAgentkitHooks,
  InMemoryAgentKitStorage,
} from "@worldcoin/agentkit";

const WALLET_ADDRESS = "0x5793BFc1331538C5A8028e71Cc22B43750163af8";

const WORLD_CHAIN = "eip155:480";
const WORLD_USDC = "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1";

// Base facilitator (Coinbase hosted)
const baseFacilitatorClient = new HTTPFacilitatorClient(facilitator);

// World Chain facilitator
const worldFacilitatorClient = new HTTPFacilitatorClient({
  url: "https://x402-worldchain.vercel.app/facilitator",
});

const evmScheme = new ExactEvmScheme()
  // Register a money parser to accept USDC payments on WorldChain
  .registerMoneyParser(async (amount, network) => {
    if (network !== WORLD_CHAIN) return null;

    return {
      amount: String(Math.round(amount * 1e6)),
      asset: WORLD_USDC,
      extra: { name: "USD Coin", version: "2" },
    };
  });

// AgentBook verifier pinned to World Chain
const agentBook = createAgentBookVerifier({ network: "world" });
const storage = new InMemoryAgentKitStorage();

// AgentKit hooks — free-trial mode: 3 free uses for verified human-backed agents
const hooks = createAgentkitHooks({
  agentBook,
  storage,
  mode: { type: "free-trial", uses: 3 },
});

const resourceServer = new x402ResourceServer(baseFacilitatorClient)
  .register("eip155:8453", evmScheme)
  .register(WORLD_CHAIN, evmScheme)
  .registerExtension(agentkitResourceServerExtension);

// Lazy init — avoid build-time network calls (Turbopack crashes)
let initPromise: Promise<void> | null = null;
export function ensureInitialized(): Promise<void> {
  if (!initPromise) {
    initPromise = resourceServer.initialize().catch((err) => {
      console.error("[x402] Facilitator init failed:", err);
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

export { resourceServer, WALLET_ADDRESS, WORLD_CHAIN, hooks };
