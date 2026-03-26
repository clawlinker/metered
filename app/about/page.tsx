import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, ArrowRight, DollarSign, Lock, Cpu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About — Metered',
  description:
    'What is Metered, what is x402, and why metered APIs matter for the agent economy.',
};

const steps = [
  {
    number: '01',
    title: 'Client sends a request',
    body: 'Any HTTP client — a browser, a script, an AI agent — makes a standard request to a paid API endpoint.',
  },
  {
    number: '02',
    title: 'Server responds 402',
    body: 'If the client hasn\'t paid, the server returns HTTP 402 Payment Required with a machine-readable payment descriptor.',
  },
  {
    number: '03',
    title: 'Client pays on-chain',
    body: 'The client reads the descriptor, signs a USDC micropayment on Base (or another supported chain), and re-sends the request with a payment proof header.',
  },
  {
    number: '04',
    title: 'Server verifies & responds',
    body: 'The server verifies the on-chain proof and returns the full response. No accounts. No API keys. No invoices.',
  },
];

const whyCards = [
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: 'Pay per use',
    body: 'Sub-cent micropayments — pay only for what you consume. No monthly plans, no overage fees.',
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'No accounts needed',
    body: 'Authentication is the payment itself. Wallet signature = identity + authorization in one step.',
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: 'Agent-native',
    body: 'AI agents can autonomously discover, pay for, and call APIs without human intervention.',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'Protocol-agnostic',
    body: 'x402 is one protocol. Metered also tracks MPP, ACP, and anything else that meters access.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-orange-500 tracking-wide uppercase">
              About Metered
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            The directory for paid APIs
            <br />
            <span className="text-zinc-400">in the agent economy.</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8">
            Metered is Product Hunt for metered APIs — a place to discover,
            upvote, and review services that charge per request. Built for
            developers and AI agents who want to find and monetize access to
            data, compute, and capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link href="/">
                Browse directory
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/submit">Submit your API</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is x402 */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            What is x402?
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed mb-6">
            <strong className="text-white">x402</strong> is an open payment
            protocol that uses HTTP status code 402 (Payment Required) to
            enable instant, programmatic micropayments for API access. It turns
            any HTTP endpoint into a paywall that machines can navigate on their
            own — no API keys, no OAuth, no billing portals.
          </p>
          <p className="text-zinc-400 text-base leading-relaxed mb-6">
            Coined in 1999, HTTP 402 was reserved for future use. x402 finally
            makes it real: a standardized way for servers to request payment and
            for clients to pay — entirely in-band, over the same HTTP
            connection.
          </p>
          <a
            href="https://x402.codes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            Read the full x402 spec
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
            How it works
          </h2>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex gap-6 pb-10"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Timeline */}
                <div className="flex flex-col items-center gap-0 shrink-0 w-12">
                  <div className="w-8 h-8 rounded-full border border-orange-500/40 bg-orange-500/10 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-orange-400">
                      {step.number}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 mt-2" />
                  )}
                </div>
                {/* Content */}
                <div className="pt-1 pb-2">
                  <h3 className="text-base font-semibold text-white mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
            Why it matters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-3">
                  {card.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to explore?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Browse live x402 services or list your own metered API in under a
            minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                Browse services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/submit">Submit an API</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
