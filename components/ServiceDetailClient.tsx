'use client';

import { Service } from '@/lib/types';
import { ServiceGrid } from '@/components/ServiceGrid';
import { ProtocolBadge } from '@/components/ProtocolBadge';
import { CategoryBadge } from '@/components/CategoryBadge';
import { UpvoteButton } from '@/components/UpvoteButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ExternalLink, ArrowLeft, Bot, User, ShieldCheck } from 'lucide-react';
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
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group min-h-[44px]"
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
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-snug">{service.name}</h1>
              <p className="text-sm md:text-lg text-zinc-400 leading-relaxed">{service.description}</p>
            </div>
            <div className="flex-shrink-0 flex items-center self-center">
              <UpvoteButton
                serviceId={service.id}
                agentUpvotes={service.agentUpvotes}
                humanUpvotes={service.humanUpvotes}
              />
            </div>
          </div>

          <Separator className="my-6 border-white/10" />

          {/* Example section */}
          {(service.exampleRequest || service.exampleResponse) && (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">Example</h2>
              <p className="text-sm text-zinc-400 mb-4">{service.exampleCost || 'Cost: Check service pricing'}</p>
              
              {service.exampleRequest && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white">Request</h3>
                  <div className="rounded-xl bg-gray-950 border border-white/10 p-4 overflow-x-auto max-w-full">
                    <pre className="text-xs md:text-sm text-green-400 font-mono whitespace-pre-wrap md:whitespace-pre break-all min-w-0">
                      {service.exampleRequest}
                    </pre>
                  </div>
                </div>
              )}
              
              {service.exampleResponse && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white">Response</h3>
                  <div className="rounded-xl bg-gray-950 border border-white/10 p-4 overflow-x-auto max-w-full">
                    <pre className="text-xs md:text-sm text-blue-400 font-mono whitespace-pre-wrap md:whitespace-pre break-all min-w-0">
                      {service.exampleResponse}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Metadata grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-6">
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

          {/* Payment method indicator */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {service.protocol === 'x402' && (
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                x402 micropayment
              </Badge>
            )}
            {service.protocol === 'mpp' && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                MPP payment
              </Badge>
            )}
            {service.protocol === 'acp' && (
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                ACP integration
              </Badge>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
            >
              <a href={service.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Use Service
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              <a
                href={`mailto:hello@metered.computer?subject=Report: ${service.name}&body=Issue with ${service.url}`}
                className="block w-full h-full"
              >
                Report Issue
              </a>
            </Button>
            {service.exampleRequest && (
              <Button
                asChild
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-white/5 gap-2"
              >
                <a href={service.url} target="_blank" rel="noopener noreferrer">
                  <Bot className="w-4 h-4" />
                  Agent Integration Guide
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Votes breakdown */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 mb-8">
          <h2 className="text-lg font-semibold text-white mb-6">Community Votes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {/* Total */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-gray-900/50 border border-white/10 p-3 md:p-6 text-center col-span-2 md:col-span-1">
              <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider mb-1 md:mb-2">Total</p>
              <p className="text-3xl md:text-5xl font-bold text-white">{totalVotes}</p>
            </div>
            {/* Agent */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-orange-500/5 border border-orange-500/20 p-3 md:p-6 text-center">
              <div className="flex items-center gap-1 md:gap-2 text-orange-400 mb-1 md:mb-2">
                <Bot className="w-3 h-3 md:w-4 md:h-4" />
                <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider">Agents</p>
              </div>
              <p className="text-2xl md:text-4xl font-bold text-orange-400">{service.agentUpvotes}</p>
              <p className="text-[10px] md:text-xs text-zinc-500 mt-1 md:mt-2 hidden sm:block">Signature verified</p>
            </div>
            {/* Human (wallet) */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-blue-500/5 border border-blue-500/20 p-3 md:p-6 text-center">
              <div className="flex items-center gap-1 md:gap-2 text-blue-400 mb-1 md:mb-2">
                <User className="w-3 h-3 md:w-4 md:h-4" />
                <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider">Humans</p>
              </div>
              <p className="text-2xl md:text-4xl font-bold text-blue-400">{service.humanUpvotes}</p>
              <p className="text-[10px] md:text-xs text-zinc-500 mt-1 md:mt-2 hidden sm:block">Signature verified</p>
            </div>
            {/* World ID verified */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-indigo-500/5 border border-indigo-500/20 p-3 md:p-6 text-center">
              <div className="flex items-center gap-1 md:gap-2 text-indigo-400 mb-1 md:mb-2">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
                <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider">World ID</p>
              </div>
              <p className="text-2xl md:text-4xl font-bold text-indigo-400">
                {/* worldidUpvotes is not in Service type — show N/A if not available */}
                {'worldidUpvotes' in service ? (service as any).worldidUpvotes : '—'}
              </p>
              <p className="text-[10px] md:text-xs text-zinc-500 mt-1 md:mt-2 hidden sm:block">Orb/Device verified</p>
            </div>
          </div>
        </div>

        {/* Agent Integration section */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Agent Integration</h2>
          </div>
          
          {/* AgentKit Trust Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-green-400">AgentKit Trust: Human-Backed</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">3 free calls before payment</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm font-medium text-red-400">10x rate for unverified bots</span>
            </div>
          </div>

          {/* Authentication Methods */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Authentication Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.protocol === 'x402' && (
                <div className="rounded-xl bg-gray-900/50 border border-purple-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-xs">x402</span>
                    </div>
                    <span className="text-sm font-medium text-purple-400">x402 Micropayment</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-3">
                    Payment header for x402 protocol. Includes authentication and payment in one header.
                  </p>
                  <div className="rounded-lg bg-gray-950 border border-purple-500/10 p-3">
                    <code className="text-xs text-purple-300 font-mono">X-Payment: &lt;x402-payment-header&gt;</code>
                  </div>
                </div>
              )}
              
              {service.protocol === 'mpp' && (
                <div className="rounded-xl bg-gray-900/50 border border-blue-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold text-xs">MPP</span>
                    </div>
                    <span className="text-sm font-medium text-blue-400">MPP Token</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-3">
                    Authentication token for Metered Payment Protocol. Get tokens via your wallet.
                  </p>
                  <div className="rounded-lg bg-gray-950 border border-blue-500/10 p-3">
                    <code className="text-xs text-blue-300 font-mono">Authorization: Bearer &lt;mpp-token&gt;</code>
                  </div>
                </div>
              )}
              
              {service.protocol === 'acp' && (
                <div className="rounded-xl bg-gray-900/50 border border-emerald-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-emerald-400 font-bold text-xs">ACP</span>
                    </div>
                    <span className="text-sm font-medium text-emerald-400">ACP Token</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-3">
                    Agent Commerce Protocol token for ACP-based integrations.
                  </p>
                  <div className="rounded-lg bg-gray-950 border border-emerald-500/10 p-3">
                    <code className="text-xs text-emerald-300 font-mono">Authorization: Bearer &lt;acp-token&gt;</code>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* API Examples */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">API Examples</h3>
            <div className="space-y-4">
              {/* curl example */}
              <div className="rounded-xl bg-gray-900/50 border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                  <span className="text-xs font-medium text-zinc-300">curl</span>
                  <button 
                    className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const code = service.exampleRequest || exampleRequests[service.protocol] || exampleRequests.other;
                      navigator.clipboard.writeText(code);
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-xs md:text-sm text-green-400 font-mono whitespace-pre-wrap md:whitespace-pre break-all min-w-0">
                    {service.exampleRequest || exampleRequests[service.protocol] || exampleRequests.other}
                  </pre>
                </div>
              </div>

              {/* JavaScript example */}
              <div className="rounded-xl bg-gray-900/50 border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                  <span className="text-xs font-medium text-zinc-300">JavaScript / Fetch</span>
                  <button 
                    className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const fetchCode = `// ${service.protocol === 'x402' ? 'x402' : service.protocol === 'mpp' ? 'MPP' : 'ACP'} example
const response = await fetch('${service.url}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ${service.protocol === 'x402' ? "'X-Payment': '&lt;x402-payment-header&gt;'" : service.protocol === 'mpp' ? "'Authorization': 'Bearer &lt;mpp-token&gt;'" : "'Authorization': 'Bearer &lt;acp-token&gt;'"}
  },
  body: JSON.stringify({ query: 'example' })
});

const data = await response.json();
console.log(data);`;
                      navigator.clipboard.writeText(fetchCode);
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-xs md:text-sm text-blue-300 font-mono whitespace-pre-wrap md:whitespace-pre break-all min-w-0">
                    {`// ${service.protocol === 'x402' ? 'x402' : service.protocol === 'mpp' ? 'MPP' : 'ACP'} example
const response = await fetch('${service.url}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ${service.protocol === 'x402' ? "'X-Payment': '&lt;x402-payment-header&gt;'" : service.protocol === 'mpp' ? "'Authorization': 'Bearer &lt;mpp-token&gt;'" : "'Authorization': 'Bearer &lt;acp-token&gt;'"}
  },
  body: JSON.stringify({ query: 'example' })
});

const data = await response.json();
console.log(data);`}
                  </pre>
                </div>
              </div>

              {/* Python example */}
              <div className="rounded-xl bg-gray-900/50 border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                  <span className="text-xs font-medium text-zinc-300">Python / requests</span>
                  <button 
                    className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const pyCode = `# ${service.protocol === 'x402' ? 'x402' : service.protocol === 'mpp' ? 'MPP' : 'ACP'} example
import requests

url = '${service.url}'
headers = {
    'Content-Type': 'application/json',
    ${service.protocol === 'x402' ? "'X-Payment': '&lt;x402-payment-header&gt;'" : service.protocol === 'mpp' ? "'Authorization': 'Bearer &lt;mpp-token&gt;'" : "'Authorization': 'Bearer &lt;acp-token&gt;'"}
}
data = {'query': 'example'}

response = requests.post(url, json=data, headers=headers)
print(response.json())`;
                      navigator.clipboard.writeText(pyCode);
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-xs md:text-sm text-emerald-300 font-mono whitespace-pre-wrap md:whitespace-pre break-all min-w-0">
                    {`# ${service.protocol === 'x402' ? 'x402' : service.protocol === 'mpp' ? 'MPP' : 'ACP'} example
import requests

url = '${service.url}'
headers = {
    'Content-Type': 'application/json',
    ${service.protocol === 'x402' ? "'X-Payment': '&lt;x402-payment-header&gt;'" : service.protocol === 'mpp' ? "'Authorization': 'Bearer &lt;mpp-token&gt;'" : "'Authorization': 'Bearer &lt;acp-token&gt;'"}
}
data = {'query': 'example'}

response = requests.post(url, json=data, headers=headers)
print(response.json())`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Common Use Cases */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Agent-to-agent service calls via ACP",
                "Automated data fetching with x402 micropayments",
                "Human-verified workflow with MPP tokens",
                "Rate-limited programmatic access",
                "Trust-tiered pricing based on AgentKit status",
                "Stateless authentication via payment headers"
              ].map((useCase, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-white/5 p-3 border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-zinc-300">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Limits */}
          {service.rateLimit && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-white mb-3">Rate Limits</h3>
              <div className="rounded-xl bg-gray-900/50 border border-white/10 p-4">
                <p className="text-sm text-zinc-300">{service.rateLimit}</p>
              </div>
            </div>
          )}

          {/* Final CTA */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-zinc-500 mb-3">
              For full API reference and documentation, visit the{' '}
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline font-medium transition-colors"
              >
                official documentation
              </a>
              .
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified by Metered
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                AgentKit Trust enabled
              </span>
            </div>
          </div>
        </div>

        {/* Integration example (deprecated, kept for reference) */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 mb-8 opacity-50">
          <h2 className="text-lg font-semibold text-white mb-4">Example Request</h2>
          <div className="rounded-xl bg-gray-950 border border-white/10 p-4 overflow-x-auto max-w-full">
            <pre className="text-xs md:text-sm text-green-400 font-mono whitespace-pre-wrap md:whitespace-pre break-all md:break-normal min-w-0">
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
