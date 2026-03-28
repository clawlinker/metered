'use client';

import { Service } from '@/lib/types';
import { ServiceGrid } from '@/components/ServiceGrid';
import { LeaderboardTabs } from '@/components/LeaderboardTabs';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Input } from '@/components/ui/input';
import { Search, Globe, Coins, Bot, BarChart3 } from 'lucide-react';
import Link from 'next/link';
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
  const [stats, setStats] = useState({ totalServices: 0, totalAgentUpvotes: 0, totalHumanUpvotes: 0 });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch services from API on mount and when tab changes
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Pass timeframe filter based on active tab
        let timeframe: string | undefined;
        if (activeTab === 'daily') {
          timeframe = 'daily';
        } else if (activeTab === 'weekly') {
          timeframe = 'weekly';
        }
        
        // Pass 'newest' sort if we're on the 'new' tab
        const sortBy = activeTab === 'new' ? 'newest' : undefined;
        const data = await getServices(undefined, sortBy, timeframe);
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [activeTab]);

  // Fetch stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
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

    // Sort based on tab (API already handles timeframe filtering)
    // For 'new' tab, sort by newest first
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
        {/* Hero — only shown on first visit or desktop */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            The x402 API directory for AI agents and developers.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Verified trust tiers powered by World ID. Pay per API call with USDC.
            Human-backed agents get free calls.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors active:scale-97"
            >
              Submit your API
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-lg transition-colors active:scale-97"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Trust Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">World ID Verified</h3>
            <p className="text-sm text-zinc-400">
              Prove unique human identity. Your votes count more. No sybils.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
              <Coins className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">x402 Payments</h3>
            <p className="text-sm text-zinc-400">
              Pay per API call with USDC on Base or World Chain. No accounts, no API keys.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Trust Tiers</h3>
            <p className="text-sm text-zinc-400">
              Human-backed agents get 3 free calls. Unverified bots pay $0.01/call.
            </p>
          </div>
        </div>

        {/* Premium Analytics Button - muted accent, not primary orange */}
        <div className="mb-6 text-left md:text-center">
          <a
            href="/analytics"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-700/30 hover:bg-zinc-700/50 text-zinc-200 text-sm font-medium rounded-lg transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <span>Premium Analytics</span>
          </a>
        </div>

        {/* Split Layout: Directory (60%) + Context Panel (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_min(380px,_40%)] gap-8 items-start">
          {/* Left Column: Service Directory */}
          <div className="space-y-6">
            {/* Search bar */}
            <div className="relative">
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
              <div className="text-center">
                <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
              </div>
            )}

            {/* Category Filter */}
            <div>
              <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </div>

            {/* Services List */}
            <ServiceGrid services={filteredServices} title={sectionTitle} />
          </div>

          {/* Right Column: Context Panel (sticky on desktop) */}
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* 1. Trust Stats */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Trust Stats</h3>
              {statsLoading ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white animate-pulse">...</p>
                      <p className="text-sm text-zinc-400">verified humans</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white animate-pulse">...</p>
                      <p className="text-sm text-zinc-400">agent upvotes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white animate-pulse">...</p>
                      <p className="text-sm text-zinc-400">x402 services listed</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stats.totalHumanUpvotes.toLocaleString()}</p>
                      <p className="text-sm text-zinc-400">verified humans</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stats.totalAgentUpvotes.toLocaleString()}</p>
                      <p className="text-sm text-zinc-400">agent upvotes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stats.totalServices.toLocaleString()}</p>
                      <p className="text-sm text-zinc-400">x402 services listed</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. API Preview */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/10 overflow-hidden">
              <h3 className="text-lg font-semibold text-white mb-3">API Preview</h3>
              <div className="font-mono text-xs text-zinc-300 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">GET</span>
                  <span className="text-blue-300">/api/services</span>
                </div>
                <div className="pl-6 text-zinc-400">
                  <span className="text-purple-400">{'{'}</span>
                  <span className="text-zinc-300"> "services": </span>
                  <span className="text-purple-400">[{'{'}]</span>
                </div>
                <div className="pl-8 text-zinc-400">
                  <span className="text-blue-300">"name"</span>
                  <span className="text-zinc-400">: </span>
                  <span className="text-green-400">"Checkr"</span>
                  <span className="text-zinc-400">,</span>
                </div>
                <div className="pl-8 text-zinc-400">
                  <span className="text-blue-300">"protocol"</span>
                  <span className="text-zinc-400">: </span>
                  <span className="text-green-400">"x402"</span>
                  <span className="text-zinc-400">,</span>
                </div>
                <div className="pl-8 text-zinc-400">
                  <span className="text-blue-300">"price"</span>
                  <span className="text-zinc-400">: </span>
                  <span className="text-green-400">"$0.01-0.05"</span>
                </div>
                <div className="pl-6 text-zinc-400">
                  <span className="text-purple-400">{'}]}'}</span>
                </div>
              </div>
              <a
                href="/api/services?limit=5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                View API docs
                <span className="text-lg">→</span>
              </a>
            </div>

            {/* 3. Trust Tiers */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Trust Tiers</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <Globe className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Human-backed agents</p>
                    <p className="text-xs text-zinc-400 mt-1">3 free calls, then $0.001</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-700/20 border border-zinc-700/30">
                  <Bot className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Unverified bots</p>
                    <p className="text-xs text-zinc-400 mt-1">$0.01/call</p>
                  </div>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                How it works
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
