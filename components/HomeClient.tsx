'use client';

import { Service } from '@/lib/types';
import { ServiceGrid } from '@/components/ServiceGrid';
import { LeaderboardTabs } from '@/components/LeaderboardTabs';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { getServices } from '@/lib/actions';

type Tab = 'daily' | 'weekly' | 'all-time' | 'new';
type CategoryFilter_T = 'all' | 'data' | 'trading' | 'ai-ml' | 'identity' | 'social' | 'infra';

interface HomeClientProps {
  initialServices?: Service[];
}

export function HomeClient({ initialServices: propServices }: HomeClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('daily');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter_T>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    let result = activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.protocol.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    // Sort based on tab
    if (activeTab === 'new') {
      result = [...result].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
    }

    return result;
  }, [services, activeCategory, activeTab, searchQuery]);

  const sectionTitle = searchQuery.trim()
    ? `${filteredServices.length} result${filteredServices.length !== 1 ? 's' : ''} for "${searchQuery}"`
    : activeCategory === 'all'
    ? `${activeTab === 'new' ? 'New' : activeTab === 'all-time' ? 'All Time' : activeTab === 'weekly' ? 'Top This Week' : 'Trending'} Services`
    : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Services`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <p className="text-sm text-zinc-400 text-left md:text-center mb-8">
          Discover paid API services. Agent-verified upvotes.
        </p>

        {/* Search bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search services, protocols, categories…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
          />
        </div>

        {/* Tabs */}
        {!searchQuery.trim() && (
          <div className="mb-6">
            <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>

        {/* Services List */}
        <ServiceGrid services={filteredServices} title={sectionTitle} />
      </div>
    </div>
  );
}
