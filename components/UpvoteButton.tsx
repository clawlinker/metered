'use client';

import { ChevronUp, Loader2, ShieldCheck, Globe } from 'lucide-react';
import { useAccount, useSignMessage } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useState, useEffect, useCallback } from 'react';
import { IDKitRequestWidget, orbLegacy } from '@worldcoin/idkit';
import { upvote } from '@/lib/actions';

interface UpvoteButtonProps {
  serviceId: string;
  agentUpvotes: number;
  humanUpvotes: number;
}

const WORLDID_APP_ID =
  (process.env.NEXT_PUBLIC_WORLDID_APP_ID as `app_${string}`) ||
  ('app_staging_placeholder' as `app_${string}`);

export function UpvoteButton({ serviceId, agentUpvotes, humanUpvotes }: UpvoteButtonProps) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();

  const [voted, setVoted] = useState(false);
  const [votedWithWorldId, setVotedWithWorldId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showChoice, setShowChoice] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [optimisticAgent, setOptimisticAgent] = useState(agentUpvotes);
  const [optimisticHuman, setOptimisticHuman] = useState(humanUpvotes);

  // Check if already voted
  useEffect(() => {
    const key = `voted:${serviceId}:${address?.toLowerCase() || 'anon'}`;
    const worldKey = `voted:worldid:${serviceId}`;
    if (localStorage.getItem(key)) setVoted(true);
    if (localStorage.getItem(worldKey)) {
      setVoted(true);
      setVotedWithWorldId(true);
    }
  }, [serviceId, address]);

  const totalUpvotes = optimisticAgent + optimisticHuman;

  // World ID proof verification + upvote
  const handleWorldIdSuccess = useCallback(
    async (nullifier_hash: string, proof: string) => {
      setLoading(true);
      try {
        const verifyRes = await fetch('/api/verify-worldid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            proof,
            nullifier_hash,
            merkle_root: '',
            action: 'upvote-service',
            signal: serviceId,
          }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyRes.ok) {
          console.error('World ID verify failed:', verifyData);
          setLoading(false);
          return;
        }

        setOptimisticHuman((prev) => prev + 1);

        const upvoteResult = await upvote(
          serviceId,
          nullifier_hash,
          'worldid',
          proof
        );

        if (upvoteResult.success) {
          setVoted(true);
          setVotedWithWorldId(true);
          if (upvoteResult.agentUpvotes !== undefined) setOptimisticAgent(upvoteResult.agentUpvotes);
          if (upvoteResult.humanUpvotes !== undefined) setOptimisticHuman(upvoteResult.humanUpvotes);
          localStorage.setItem(`voted:worldid:${serviceId}`, '1');
        } else {
          setOptimisticHuman((prev) => prev - 1);
          if (upvoteResult.error === 'Already voted') {
            setVoted(true);
            setVotedWithWorldId(true);
          }
        }
      } catch (err) {
        setOptimisticHuman((prev) => prev - 1);
        console.error('World ID upvote error:', err);
      } finally {
        setLoading(false);
        setWidgetOpen(false);
        setShowChoice(false);
      }
    },
    [serviceId]
  );

  // Standard wallet upvote
  async function handleWalletUpvote() {
    if (!isConnected || !address) {
      openConnectModal?.();
      setShowChoice(false);
      return;
    }

    setShowChoice(false);
    setLoading(true);

    try {
      setOptimisticHuman((prev) => prev + 1);

      const message = `Upvote ${serviceId} on Metered`;
      const signature = await signMessageAsync({ message });

      const result = await upvote(serviceId, address, 'wallet', signature);

      if (result.success) {
        setVoted(true);
        if (result.agentUpvotes !== undefined) setOptimisticAgent(result.agentUpvotes);
        if (result.humanUpvotes !== undefined) setOptimisticHuman(result.humanUpvotes);
        localStorage.setItem(`voted:${serviceId}:${address.toLowerCase()}`, '1');
      } else {
        setOptimisticHuman((prev) => prev - 1);
        if (result.error === 'Already voted') setVoted(true);
      }
    } catch {
      setOptimisticHuman((prev) => prev - 1);
    } finally {
      setLoading(false);
    }
  }

  function handleMainClick() {
    if (voted || loading) return;
    setShowChoice(true);
  }

  const isDisabled = voted || loading;

  return (
    <div className="relative flex flex-col items-center">
      {/* IDKit widget (headless) */}
      <IDKitRequestWidget
        open={widgetOpen}
        onOpenChange={(open) => {
          setWidgetOpen(open);
          if (!open) setShowChoice(false);
        }}
        onSuccess={(result: any) => {
          handleWorldIdSuccess(result.nullifier_hash, result.proof);
        }}
        onError={(errorCode: any) => {
          console.error('World ID error:', errorCode);
          setWidgetOpen(false);
        }}
        app_id={WORLDID_APP_ID}
        action="upvote-service"
        allow_legacy_proofs={true}
        environment="staging"
        rp_context={{
          rp_id: 'rp_staging_placeholder',
          nonce: 'demo-nonce-12345',
          created_at: Date.now(),
          expires_at: Date.now() + 300000,
          signature: 'demo-signature-placeholder',
        }}
        preset={orbLegacy({ signal: serviceId })}
      />

      {/* Choice popup */}
      {showChoice && !voted && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 w-52 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 p-2 flex flex-col gap-1.5">
          <p className="text-[11px] font-medium text-zinc-500 text-center px-2 pt-1 pb-0.5">
            Vote as…
          </p>

          {/* World ID option */}
          <button
            onClick={() => setWidgetOpen(true)}
            className="group flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600/20 to-violet-600/20 hover:from-indigo-600/30 hover:to-violet-600/30 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-150 active:scale-[0.97]"
          >
            {/* World ID orb icon */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-sm shadow-indigo-500/30">
              <Globe className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-indigo-300 leading-tight">World ID</p>
              <p className="text-[10px] text-zinc-500 leading-tight">Orb verified</p>
            </div>
          </button>

          {/* Wallet option */}
          <button
            onClick={handleWalletUpvote}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-150 active:scale-[0.97]"
          >
            <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
              <ChevronUp className="w-3.5 h-3.5 text-zinc-300" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-zinc-200 leading-tight">Wallet</p>
              <p className="text-[10px] text-zinc-500 leading-tight">Sign a message</p>
            </div>
          </button>

          <button
            onClick={() => setShowChoice(false)}
            className="text-[11px] text-zinc-600 hover:text-zinc-400 text-center py-1.5 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Main upvote button */}
      <button
        onClick={handleMainClick}
        disabled={isDisabled}
        aria-label="Upvote"
        className={[
          'group flex flex-col items-center gap-0.5 rounded-xl border min-w-[52px] min-h-[52px] px-2 py-2 transition-all duration-150',
          voted
            ? votedWithWorldId
              ? 'border-indigo-500/50 bg-indigo-500/10 cursor-default'
              : 'border-orange-500/50 bg-orange-500/10 cursor-default'
            : isDisabled
            ? 'border-zinc-700 opacity-50 cursor-not-allowed'
            : 'border-zinc-800 hover:border-orange-500/40 hover:bg-white/[0.03] active:scale-95 cursor-pointer',
        ].join(' ')}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
        ) : votedWithWorldId ? (
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
        ) : (
          <ChevronUp
            className={[
              'w-4 h-4 transition-transform',
              voted
                ? 'text-orange-400'
                : 'text-orange-500 group-hover:-translate-y-0.5',
            ].join(' ')}
          />
        )}

        <span className="text-sm font-bold text-white tabular-nums leading-none mt-0.5">
          {totalUpvotes}
        </span>

        <div className="text-[9px] text-zinc-500 mt-0.5 whitespace-nowrap hidden sm:flex gap-1 items-center">
          <span className="text-orange-500/80">🤖 {optimisticAgent}</span>
          <span>·</span>
          <span className={votedWithWorldId ? 'text-indigo-400' : 'text-blue-400/80'}>
            {votedWithWorldId ? '🌐' : '👤'} {optimisticHuman}
          </span>
        </div>
      </button>
    </div>
  );
}
