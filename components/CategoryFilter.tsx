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
    <div className="relative mb-8">
      {/* Right fade — hints at horizontal scroll on mobile */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-gray-950 to-transparent z-10 md:hidden"
        aria-hidden="true"
      />
      {/* Left fade (for non-leftmost position) */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-gray-950 to-transparent z-10 md:hidden"
        aria-hidden="true"
      />
      <div className="flex items-center justify-start md:justify-center overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide px-1">
        <div className="flex items-center gap-2 pr-8 md:pr-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                // 44px min touch target
                "min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0",
                activeCategory === cat.id
                  ? "bg-white text-black"
                  : "bg-transparent text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white active:bg-white/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
