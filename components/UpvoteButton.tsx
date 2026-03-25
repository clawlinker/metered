'use client';

import { useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || !onClick) return;
    // Visual click effect handled by state
    onClick();
  };

  const totalUpvotes = agentUpvotes + humanUpvotes;

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      disabled={disabled}
      className={`group flex flex-col items-center gap-1 rounded-lg p-2 transition-colors ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-white/5 active:scale-95'
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-orange-500">🤖 {agentUpvotes}</span>
        <span className="text-gray-400">|</span>
        <span className="text-blue-400">👤 {humanUpvotes}</span>
      </div>
      <div className="flex items-center gap-1 text-xl font-bold text-white">
        <svg
          className={`w-6 h-6 transition-transform group-hover:-translate-y-0.5 ${
            isHovered ? 'fill-orange-500 text-orange-500' : 'text-gray-400'
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span>{totalUpvotes}</span>
      </div>
    </button>
  );
}
