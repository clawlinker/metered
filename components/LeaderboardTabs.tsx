'use client';

import { useState } from 'react';

type Tab = 'daily' | 'weekly' | 'all-time' | 'new';

const tabs: { id: Tab; label: string }[] = [
  { id: 'daily', label: 'Daily Trending' },
  { id: 'weekly', label: 'Weekly Top' },
  { id: 'all-time', label: 'All-Time' },
  { id: 'new', label: 'New Launches' },
];

interface LeaderboardTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'bg-orange-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
