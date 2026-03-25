'use client';

import { useState } from 'react';
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
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeCategory === cat.id
              ? 'bg-white text-gray-900'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
