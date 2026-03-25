import { Protocol } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProtocolBadgeProps {
  protocol: Protocol;
}

export function ProtocolBadge({ protocol }: ProtocolBadgeProps) {
  const variants = {
    x402: "text-orange-400/80",
    mpp: "text-emerald-400/80",
    acp: "text-violet-400/80",
    other: "text-zinc-400",
  };

  const labels = {
    x402: "x402",
    mpp: "MPP",
    acp: "ACP",
    other: "Other",
  };

  return (
    <span className={cn("text-xs font-medium", variants[protocol])}>
      {labels[protocol]}
    </span>
  );
}
