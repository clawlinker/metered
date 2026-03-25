'use client';

import { Category } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const categoryColors: Record<Category, string> = {
  data: 'bg-purple-500 text-white border-purple-500',
  trading: 'bg-pink-500 text-white border-pink-500',
  'ai-ml': 'bg-cyan-500 text-white border-cyan-500',
  identity: 'bg-emerald-500 text-white border-emerald-500',
  social: 'bg-amber-500 text-white border-amber-500',
  infra: 'bg-slate-500 text-white border-slate-500',
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
    <Badge variant="outline" className={`${categoryColors[category]} border px-2 py-0.5 text-xs font-medium`}>
      {label}
    </Badge>
  );
}
