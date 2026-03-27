import { Protocol } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProtocolBadgeProps {
  protocol: Protocol;
}

export function ProtocolBadge({ protocol }: ProtocolBadgeProps) {
  const variants = {
    x402: "text-orange-400/50 bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20",
    mpp: "text-emerald-400/80 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20",
    acp: "text-violet-400/80 bg-violet-400/10 px-2 py-0.5 rounded-full border border-violet-400/20",
    other: "text-zinc-400 bg-zinc-700/20 px-2 py-0.5 rounded-full border border-zinc-700/30",
  };

  const labels = {
    x402: "x402",
    mpp: "MPP",
    acp: "ACP",
    other: "Other",
  };

  return (
    <span className={cn("text-[10px] font-semibold uppercase tracking-wider", variants[protocol])}>
      {labels[protocol]}
    </span>
  );
}
