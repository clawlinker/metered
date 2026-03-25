'use client';

import { Protocol } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export function ProtocolBadge({ protocol }: { protocol: Protocol }) {
  const variants: Record<Protocol, 'default' | 'secondary' | 'outline'> = {
    x402: 'default',
    mpp: 'secondary',
    acp: 'secondary',
    other: 'outline',
  };

  const bgColors: Record<Protocol, string> = {
    x402: 'bg-orange-500 text-white border-orange-500',
    mpp: 'bg-green-500 text-white border-green-500',
    acp: 'bg-purple-500 text-white border-purple-500',
    other: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  const label = {
    x402: 'x402',
    mpp: 'MPP',
    acp: 'ACP',
    other: 'Other',
  }[protocol];

  return (
    <Badge variant="outline" className={`${bgColors[protocol]} border px-2 py-0.5 text-xs font-medium`}>
      {label}
    </Badge>
  );
}
