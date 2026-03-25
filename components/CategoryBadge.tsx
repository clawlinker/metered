'use client';

import { Category } from '@/lib/types';

const categoryColors: Record<Category, string> = {
  data: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  trading: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  'ai-ml': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  identity: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  social: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  infra: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
};

export function CategoryBadge({ category }: { category: Category }) {
  const label = {
    data: 'Data',
    trading: 'Trading',
    'ai-ml': 'AI/ML',
    identity: 'Identity',
    social: 'Social',
    infra: 'Infra',
  }[category];

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${categoryColors[category]}`}>
      {label}
    </span>
  );
}
