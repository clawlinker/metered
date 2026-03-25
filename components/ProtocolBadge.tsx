'use client';

import { Protocol } from '@/lib/types';

const protocolColors: Record<Protocol, string> = {
  x402: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  mpp: 'bg-green-500/10 text-green-500 border-green-500/20',
  acp: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  other: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

export function ProtocolBadge({ protocol }: { protocol: Protocol }) {
  const label = {
    x402: 'x402',
    mpp: 'MPP',
    acp: 'ACP',
    other: 'Other',
  }[protocol];

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${protocolColors[protocol]}`}>
      {label}
    </span>
  );
}
