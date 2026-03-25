'use client';

import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'data', label: 'Data' },
    { id: 'trading', label: 'Trading' },
    { id: 'ai-ml', label: 'AI/ML' },
    { id: 'identity', label: 'Identity' },
    { id: 'social', label: 'Social' },
    { id: 'infra', label: 'Infra' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium transition-colors",
            activeCategory === cat.id
              ? "bg-white text-black"
              : "bg-transparent text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
