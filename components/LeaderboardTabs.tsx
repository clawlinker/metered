'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as Tab)} className="w-full">
      <TabsList className="grid grid-cols-4 bg-white/5">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:hover:bg-orange-600"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
