'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Zap, Shield, Globe, Lock, Loader2, ExternalLink, ArrowRight } from 'lucide-react';

function WorldChainLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="14" cy="14" r="14" fill="#191919" />
      <path d="M14 5.5C9.305 5.5 5.5 9.305 5.5 14C5.5 18.695 9.305 22.5 14 22.5C18.695 22.5 22.5 18.695 22.5 14C22.5 9.305 18.695 5.5 14 5.5Z" stroke="white" strokeWidth="1.2" />
      <ellipse cx="14" cy="14" rx="4.2" ry="8.5" stroke="white" strokeWidth="1.2" />
      <path d="M6 14H22" stroke="white" strokeWidth="1.2" />
      <path d="M7 10.5H21" stroke="white" strokeWidth="1.2" />
      <path d="M7 17.5H21" stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

function CoinbaseLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="14" cy="14" r="14" fill="#0052FF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14 20.5C17.59 20.5 20.5 17.59 20.5 14C20.5 10.41 17.59 7.5 14 7.5C10.41 7.5 7.5 10.41 7.5 14C7.5 17.59 10.41 20.5 14 20.5ZM11.5 12.5C11.5 12.22 11.72 12 12 12H16C16.28 12 16.5 12.22 16.5 12.5V15.5C16.5 15.78 16.28 16 16 16H12C11.72 16 11.5 15.78 11.5 15.5V12.5Z" fill="white" />
    </svg>
  );
}

interface AnalyticsData {
  pricingBreakdown: {
    x402Services: number;
    mppServices: number;
    acpServices: number;
    otherServices: number;
    totalServices: number;
    averagePrice: string;
    priceRange: string;
  };
  protocolStats: Record<string, { count: number; percentage: number; growth24h: string }>;
  categoryTrends: Record<string, { count: number; growth24h: string; topServices: string[] }>;
  topServices: Array<{ id: string; name: string; price: string; category: string }>;
  marketInsights: {
    totalMarketCap: string;
    activeAgents: number;
    dailyTransactions: string;
    totalVolume: string;
  };
}

function StatCard({ label, value, sub, accent = false }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className={['rounded-2xl border p-5 flex flex-col gap-1', accent ? 'bg-orange-500/5 border-orange-500/20' : 'bg-white/[0.03] border-white/10'].join(' ')}>
      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
      <p className={['text-2xl font-bold', accent ? 'text-orange-400' : 'text-white'].join(' ')}>{value}</p>
      {sub && <p className="text-xs text-zinc-500">{sub}</p>}
    </div>
  );
}

function ProtocolBar({ label, percentage, count, growth, color }: { label: string; percentage: number; count: number; growth: string; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-white">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">{count} services</span>
          <span className={['text-xs font-medium tabular-nums', growth.startsWith('+') && growth !== '+0%' ? 'text-green-400' : 'text-zinc-500'].join(' ')}>{growth}</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div className={['h-full rounded-full', color].join(' ')} style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-[11px] text-zinc-600">{percentage}% of directory</p>
    </div>
  );
}

const MOCK_DATA: AnalyticsData = {
  pricingBreakdown: { x402Services: 8, mppServices: 1, acpServices: 0, otherServices: 1, totalServices: 10, averagePrice: '$0.05', priceRange: '$0.001 – $0.10' },
  protocolStats: {
    x402: { count: 8, percentage: 80, growth24h: '+12%' },
    mpp: { count: 1, percentage: 10, growth24h: '+0%' },
    acp: { count: 0, percentage: 0, growth24h: '+0%' },
    other: { count: 1, percentage: 10, growth24h: '+0%' },
  },
  categoryTrends: {
    data: { count: 3, growth24h: '+25%', topServices: ['Checkr', 'Zerion API', 'Mercuryclaw'] },
    'ai-ml': { count: 2, growth24h: '+15%', topServices: ['Hyperbolic GPU', 'Orthogonal Skills'] },
    identity: { count: 2, growth24h: '+8%', topServices: ['pawr.link', 'Coinbase CDP'] },
    infra: { count: 2, growth24h: '+10%', topServices: ['Bazaar', 'Tangle Network'] },
    trading: { count: 0, growth24h: '–', topServices: [] },
    social: { count: 0, growth24h: '–', topServices: [] },
  },
  topServices: [
    { id: 'checkr', name: 'Checkr', price: '$0.01–0.05', category: 'data' },
    { id: 'pawr-link', name: 'pawr.link', price: '$9–10', category: 'identity' },
    { id: 'bazaar', name: 'Bazaar', price: 'varies', category: 'infra' },
    { id: 'coinbase-cdp', name: 'Coinbase CDP', price: 'varies', category: 'identity' },
    { id: 'zerion-api', name: 'Zerion API', price: '$0.01', category: 'data' },
  ],
  marketInsights: { totalMarketCap: '$2.5M', activeAgents: 156, dailyTransactions: '1,234', totalVolume: '$45,678' },
};

const PROTOCOL_COLORS: Record<string, string> = {
  x402: 'bg-orange-500',
  mpp: 'bg-emerald-500',
  acp: 'bg-violet-500',
  other: 'bg-zinc-500',
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  async function handleUnlock() {
    setLoading(true);
    setError(null);
    try {
      // The x402 paywall is handled server-side via withX402 wrapper
      // When the user clicks "Unlock", the server will return 402 with
      // payment requirements that trigger the x402 paywall
      const res = await fetch('/api/x402/analytics');
      if (res.status === 402) {
        // Payment required - show user a clear message instead of infinite reload
        // The x402 paywall can't be triggered client-side without SDK integration
        setError('Payment required — please use an x402-compatible wallet to unlock this data.');
        return;
      }
      if (!res.ok) throw new Error('Failed');
      setData(await res.json());
      setUnlocked(true);
    } catch (err) {
      console.error('Unlock error:', err);
      setError('Failed to unlock analytics. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-orange-500 tracking-wide uppercase">Premium Analytics</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">Market Intelligence</h1>
          <p className="text-zinc-400 max-w-xl">Deep data on the metered API ecosystem — protocol adoption, category trends, pricing benchmarks, and agent activity. Powered by x402.</p>
        </div>

        {/* Powered-by badges */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <CoinbaseLogo className="w-5 h-5" />
            <span className="text-xs font-medium text-zinc-300">Base Network</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <WorldChainLogo className="w-5 h-5" />
            <span className="text-xs font-medium text-zinc-300">World Chain</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-medium text-orange-400">x402 Protected</span>
          </div>
        </div>

        {/* Paywall */}
        {!unlocked && (
          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-8 md:p-12 text-center mb-10 relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col gap-3 p-8 opacity-20 pointer-events-none select-none blur-[3px]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="h-3 rounded bg-white/20 flex-1" />
                  <div className="h-3 rounded bg-white/20 w-16" />
                  <div className="h-3 rounded bg-orange-400/40 w-10" />
                </div>
              ))}
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-5">
                <Lock className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Premium Analytics</h2>
              
              {/* Payment badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                <span className="text-xs font-semibold text-orange-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  $0.001 per request
                </span>
              </div>
              
              <p className="text-zinc-300 text-sm mb-6 max-w-sm mx-auto">
                <span className="font-medium text-white">x402 micropayment protocol</span> required to unlock live market data, protocol benchmarks, and category trends on Base Network.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleUnlock} disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 active:scale-[0.97] transition-transform shadow-lg shadow-orange-500/20">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Unlocking…</> : <><Zap className="w-4 h-4" />Unlock with x402 · $0.001</>}
                </Button>
                <Button variant="outline" className="border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 gap-2" asChild>
                  <a href="https://x402.codes" target="_blank" rel="noopener noreferrer">What is x402? <ExternalLink className="w-3.5 h-3.5" /></a>
                </Button>
              </div>
              {error && <p className="mt-4 text-xs text-red-400 max-w-sm mx-auto">{error}</p>}
            </div>
          </div>
        )}

        {/* Data */}
        {unlocked && data && (
          <div className="space-y-8">
            <section>
              <h2 className="text-base font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-400" /> Market Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard label="Total Services" value={data.pricingBreakdown.totalServices} accent />
                <StatCard label="Active Agents" value={data.marketInsights.activeAgents} />
                <StatCard label="Daily Transactions" value={data.marketInsights.dailyTransactions} />
                <StatCard label="Total Volume" value={data.marketInsights.totalVolume} />
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" /> Pricing Benchmarks
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div><p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Avg price</p><p className="text-lg font-bold text-white">{data.pricingBreakdown.averagePrice}</p></div>
                <div><p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Range</p><p className="text-lg font-bold text-white">{data.pricingBreakdown.priceRange}</p></div>
                <div><p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Market cap</p><p className="text-lg font-bold text-white">{data.marketInsights.totalMarketCap}</p></div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-orange-400" /> Protocol Adoption
              </h2>
              <div className="space-y-5">
                {Object.entries(data.protocolStats).map(([proto, stats]) => (
                  <ProtocolBar key={proto} label={proto.toUpperCase()} percentage={stats.percentage} count={stats.count} growth={stats.growth24h} color={PROTOCOL_COLORS[proto] ?? 'bg-zinc-500'} />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-400" /> Category Trends
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(data.categoryTrends).filter(([, v]) => v.count > 0).sort(([, a], [, b]) => b.count - a.count).map(([cat, stats]) => (
                  <div key={cat} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white capitalize">{cat === 'ai-ml' ? 'AI/ML' : cat}</span>
                      <span className={['text-xs font-medium', stats.growth24h.startsWith('+') && stats.growth24h !== '+0%' ? 'text-green-400' : 'text-zinc-500'].join(' ')}>{stats.growth24h} 24h</span>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1.5">{stats.count}</p>
                    <p className="text-[11px] text-zinc-500 line-clamp-1">{stats.topServices.join(', ')}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-400" /> Top Services
              </h2>
              <div className="flex flex-col divide-y divide-white/5">
                {data.topServices.map((svc, i) => (
                  <div key={svc.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="text-xs font-medium text-zinc-600 w-4 text-right tabular-nums shrink-0">{i + 1}</span>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-white/5 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-orange-500">{svc.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{svc.name}</p>
                      <p className="text-xs text-zinc-500 capitalize">{svc.category}</p>
                    </div>
                    <span className="text-sm font-medium text-zinc-300 shrink-0">{svc.price}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-zinc-500">Analytics powered by x402 micropayments on Base &amp; World Chain</p>
              <div className="flex items-center gap-3">
                <CoinbaseLogo className="w-6 h-6" />
                <WorldChainLogo className="w-6 h-6" />
                <div className="h-4 w-px bg-white/10" />
                <a href="https://x402.codes" target="_blank" rel="noopener noreferrer" className="text-xs text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1">
                  x402.codes <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
