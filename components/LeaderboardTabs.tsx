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
    <div className="mb-6">
      <p className="text-sm text-gray-400 text-center mb-3 md:mb-4">Today — March 25, 2026</p>
      <div className="flex items-center justify-start md:justify-center overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex items-center gap-2 md:gap-4 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as Tab)}
              className={cn(
                "text-sm whitespace-nowrap transition-colors hover:text-white min-h-[44px] px-1 flex items-center",
                activeTab === tab.id
                  ? "text-white border-b-2 border-orange-500"
                  : "text-zinc-400"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
