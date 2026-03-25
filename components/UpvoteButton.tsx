'use client';

import { ChevronUp } from 'lucide-react';

interface UpvoteButtonProps {
  agentUpvotes: number;
  humanUpvotes: number;
  disabled?: boolean;
  onClick?: () => void;
}

export function UpvoteButton({
  agentUpvotes,
  humanUpvotes,
  disabled = false,
  onClick,
}: UpvoteButtonProps) {
  const totalUpvotes = agentUpvotes + humanUpvotes;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group flex flex-col items-center gap-2 rounded-lg border border-zinc-700 hover:border-orange-500/50 p-2 transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5 active:scale-95'
      }`}
    >
      <div className="flex items-center justify-center">
        <ChevronUp
          className={`w-5 h-5 transition-transform ${
            disabled ? 'text-zinc-400' : 'text-orange-500 group-hover:text-orange-400'
          }`}
        />
      </div>
      <div className="text-sm font-semibold text-white">{totalUpvotes}</div>
    </button>
  );
}
