'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Tab = 'daily' | 'weekly' | 'all-time' | 'new';

const tabs: { id: Tab; label: string }[] = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'all-time', label: 'All-Time' },
  { id: 'new', label: 'New' },
];

interface LeaderboardTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as Tab)} className="w-full">
      <TabsList className="grid grid-cols-4 bg-white/5 h-10">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:hover:bg-orange-600 data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/20"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
