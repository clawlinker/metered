'use client';

import { Service } from '@/lib/types';
import { ServiceGrid } from '@/components/ServiceGrid';
import { ProtocolBadge } from '@/components/ProtocolBadge';
import { CategoryBadge } from '@/components/CategoryBadge';
import { UpvoteButton } from '@/components/UpvoteButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ExternalLink, ArrowLeft, Bot, User } from 'lucide-react';
import Link from 'next/link';

interface ServiceDetailClientProps {
  service: Service;
  similarServices: Service[];
}

const exampleRequests: Record<string, string> = {
  x402: `curl -X POST https://api.example.com/v1/query \\
  -H "Content-Type: application/json" \\
  -H "X-Payment: <x402-payment-header>" \\
  -d '{"query": "example"}'`,
  mpp: `curl -X POST https://api.example.com/v1/query \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <mpp-token>" \\
  -d '{"query": "example"}'`,
  acp: `curl -X POST https://api.example.com/v1/query \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <acp-token>" \\
  -d '{"query": "example"}'`,
  other: `curl -X POST https://api.example.com/v1/query \\
  -H "Content-Type: application/json" \\
  -d '{"query": "example"}'`,
};

export function ServiceDetailClient({ service, similarServices }: ServiceDetailClientProps) {
  const totalVotes = service.agentUpvotes + service.humanUpvotes;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 max-w-5xl">
        {/* Back nav */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to directory
        </Link>

        {/* Hero card */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 mb-8">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <CategoryBadge category={service.category} />
            <ProtocolBadge protocol={service.protocol} />
            {service.verified && (
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-400 border-green-500/20 gap-1"
              >
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </Badge>
            )}
          </div>

          {/* Title + upvote */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{service.name}</h1>
              <p className="text-base md:text-lg text-zinc-400">{service.description}</p>
            </div>
            <div className="flex-shrink-0">
              <UpvoteButton
                serviceId={service.id}
                agentUpvotes={service.agentUpvotes}
                humanUpvotes={service.humanUpvotes}
              />
            </div>
          </div>

          <Separator className="my-6 border-white/10" />

          {/* Metadata grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
            {[
              { label: 'Price', value: service.priceText },
              { label: 'Network', value: service.network },
              { label: 'Protocol', value: service.protocol.toUpperCase() },
              {
                label: 'Submitted',
                value: new Date(service.submittedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }),
              },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
            >
              <a href={service.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              Report Issue
            </Button>
          </div>
        </div>

        {/* Votes breakdown */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 mb-8">
          <h2 className="text-lg font-semibold text-white mb-6">Community Votes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-gray-900/50 border border-white/10 p-6 text-center">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Total</p>
              <p className="text-5xl font-bold text-white">{totalVotes}</p>
            </div>
            {/* Agent */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-orange-500/5 border border-orange-500/20 p-6 text-center">
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <Bot className="w-4 h-4" />
                <p className="text-xs font-medium uppercase tracking-wider">Agent Votes</p>
              </div>
              <p className="text-4xl font-bold text-orange-400">{service.agentUpvotes}</p>
              <p className="text-xs text-zinc-500 mt-2">ERC-8004 verified agents</p>
            </div>
            {/* Human */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-blue-500/5 border border-blue-500/20 p-6 text-center">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <User className="w-4 h-4" />
                <p className="text-xs font-medium uppercase tracking-wider">Human Votes</p>
              </div>
              <p className="text-4xl font-bold text-blue-400">{service.humanUpvotes}</p>
              <p className="text-xs text-zinc-500 mt-2">Wallet-verified humans</p>
            </div>
          </div>
        </div>

        {/* Integration example */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Example Request</h2>
          <div className="rounded-xl bg-gray-950 border border-white/10 p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono whitespace-pre">
              {exampleRequests[service.protocol] ?? exampleRequests.other}
            </pre>
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            Visit the{' '}
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline"
            >
              official documentation
            </a>{' '}
            for full API reference and authentication details.
          </p>
        </div>

        {/* Similar services */}
        {similarServices.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Similar Services</h2>
            <ServiceGrid services={similarServices} />
          </div>
        )}
      </div>
    </div>
  );
}
