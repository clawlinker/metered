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
      className={`group flex flex-col items-center gap-2 rounded-lg p-2 transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5 active:scale-95'
      }`}
    >
      <div className="flex items-center justify-center">
        <ChevronUp
          className={`w-5 h-5 transition-transform group-hover:-translate-y-0.5 ${
            disabled ? 'text-gray-400' : 'text-orange-500 group-hover:text-orange-400'
          }`}
        />
      </div>
      <div className="text-lg font-bold text-white">{totalUpvotes}</div>
      <div className="flex items-center gap-1.5 text-[10px] font-medium">
        <span className="flex items-center gap-0.5 text-orange-500">
          <ChevronUp className="w-2 h-2" />
          {agentUpvotes}
        </span>
        <span className="text-gray-400">|</span>
        <span className="flex items-center gap-0.5 text-blue-400">
          <ChevronUp className="w-2 h-2" />
          {humanUpvotes}
        </span>
      </div>
    </button>
  );
}
