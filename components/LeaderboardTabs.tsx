'use client';

import { cn } from '@/lib/utils';

type Tab = 'daily' | 'weekly' | 'all-time' | 'new';

interface LeaderboardTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  const tabs = [
    { id: 'daily', label: 'Trending' },
    { id: 'weekly', label: 'Top This Week' },
    { id: 'all-time', label: 'All Time' },
    { id: 'new', label: 'New' },
  ];

  return (
    <div className="flex items-center justify-center gap-6 mb-6">
      <p className="text-sm text-gray-400">Today — March 25, 2026</p>
      <div className="flex items-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as Tab)}
            className={cn(
              "text-sm transition-colors hover:text-white",
              activeTab === tab.id
                ? "text-white border-b-2 border-orange-500 pb-0.5"
                : "text-zinc-400"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
