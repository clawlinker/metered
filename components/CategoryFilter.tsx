'use client';

import { Category } from '@/lib/types';

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
    <div className="flex flex-wrap items-center justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
            activeCategory === cat.id
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
