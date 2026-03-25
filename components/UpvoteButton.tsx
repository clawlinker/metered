'use client';

import { ChevronUp, Loader2 } from 'lucide-react';
import { useAccount, useSignMessage } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { upvote } from '@/lib/actions';

interface UpvoteButtonProps {
  serviceId: string;
  agentUpvotes: number;
  humanUpvotes: number;
}

export function UpvoteButton({ serviceId, agentUpvotes, humanUpvotes }: UpvoteButtonProps) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();

  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [optimisticAgent, setOptimisticAgent] = useState(agentUpvotes);
  const [optimisticHuman, setOptimisticHuman] = useState(humanUpvotes);

  // Check if already voted
  useEffect(() => {
    if (!address) {
      setVoted(false);
      return;
    }
    const key = `voted:${serviceId}:${address.toLowerCase()}`;
    if (localStorage.getItem(key)) {
      setVoted(true);
    }
  }, [serviceId, address]);

  const totalUpvotes = optimisticAgent + optimisticHuman;

  async function handleClick() {
    if (!isConnected || !address) {
      openConnectModal?.();
      return;
    }

    if (voted || loading) return;

    setLoading(true);

    try {
      // Optimistic update
      setOptimisticHuman((prev) => prev + 1);

      const message = `Upvote ${serviceId} on Metered`;
      const signature = await signMessageAsync({ message });

      const result = await upvote(serviceId, address, 'wallet', signature);

      if (result.success) {
        setVoted(true);
        // Update with real counts
        if (result.agentUpvotes !== undefined) setOptimisticAgent(result.agentUpvotes);
        if (result.humanUpvotes !== undefined) setOptimisticHuman(result.humanUpvotes);
        // Persist in localStorage
        localStorage.setItem(`voted:${serviceId}:${address.toLowerCase()}`, '1');
      } else {
        // Revert optimistic update
        setOptimisticHuman((prev) => prev - 1);
        if (result.error === 'Already voted') {
          setVoted(true);
        }
      }
    } catch (err) {
      // User rejected or error — revert
      setOptimisticHuman((prev) => prev - 1);
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = voted || loading;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`group flex flex-col items-center gap-0.5 rounded-lg border p-1.5 md:p-2 transition-colors ${
        voted
          ? 'border-orange-500/50 bg-orange-500/10 cursor-default'
          : isDisabled
          ? 'border-zinc-700 opacity-50 cursor-not-allowed'
          : 'border-zinc-700 hover:border-orange-500/50 hover:bg-white/5 active:scale-95 cursor-pointer'
      }`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-orange-500 animate-spin" />
      ) : (
        <ChevronUp
          className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${
            voted ? 'text-orange-400' : 'text-orange-500 group-hover:text-orange-400'
          }`}
        />
      )}
      <div className="text-xs md:text-sm font-semibold text-white mt-0.5 md:mt-1">
        {totalUpvotes}
      </div>
      <div className="text-[10px] text-zinc-400 mt-0.5 md:mt-1 whitespace-nowrap hidden sm:block">
        <span className="text-orange-500">🤖 {optimisticAgent}</span>
        <span className="mx-0.5">·</span>
        <span className="text-blue-400">👤 {optimisticHuman}</span>
      </div>
    </button>
  );
}
