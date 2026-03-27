import Link from 'next/link';
import { Zap } from 'lucide-react';

// World Chain logo
function WorldChainLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="World Chain">
      <circle cx="12" cy="12" r="12" fill="#191919" />
      <path d="M12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4Z" stroke="white" strokeWidth="1.1" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8" stroke="white" strokeWidth="1.1" />
      <path d="M4.5 12H19.5" stroke="white" strokeWidth="1.1" />
      <path d="M5.5 9H18.5" stroke="white" strokeWidth="1.1" />
      <path d="M5.5 15H18.5" stroke="white" strokeWidth="1.1" />
    </svg>
  );
}

// Coinbase / Base logo
function CoinbaseLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Coinbase Base">
      <circle cx="12" cy="12" r="12" fill="#0052FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM10 10.5C10 10.2239 10.2239 10 10.5 10H13.5C13.7761 10 14 10.2239 14 10.5V13.5C14 13.7761 13.7761 14 13.5 14H10.5C10.2239 14 10 13.7761 10 13.5V10.5Z"
        fill="white"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950 mt-auto pb-safe">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-white">Metered</span>
            </Link>
            <p className="text-xs text-zinc-500 max-w-xs">
              Product Hunt for paid APIs. Discover protocol-agnostic metered services — x402, MPP, ACP, and beyond.
            </p>

            {/* Hackathon badge */}
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] px-2.5 py-1">
                <CoinbaseLogo className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[10px] font-medium text-zinc-400">x402</span>
                <span className="text-zinc-700 text-[10px]">+</span>
                <WorldChainLogo className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[10px] font-medium text-zinc-400">World ID</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Directory</p>
              <Link href="/" className="text-zinc-500 hover:text-white transition-colors min-h-[44px] flex items-center">Browse All</Link>
              <Link href="/analytics" className="text-zinc-500 hover:text-white transition-colors min-h-[44px] flex items-center">Analytics</Link>
              <Link href="/submit" className="text-zinc-500 hover:text-white transition-colors min-h-[44px] flex items-center">Submit</Link>
              <Link href="/about" className="text-zinc-500 hover:text-white transition-colors min-h-[44px] flex items-center">About</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Protocols</p>
              <a href="https://x402.codes" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors min-h-[44px] flex items-center">x402</a>
              <a href="https://virtuals.io" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors min-h-[44px] flex items-center">ACP</a>
            </div>
          </nav>
        </div>

        <div className="mt-8 pb-6 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            © 2026 Metered. Built for the agent economy.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600">
            <a href="https://x402.codes" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
              x402 Docs
            </a>
            <span>·</span>
            <Link href="/submit" className="hover:text-zinc-400 transition-colors">
              List Your API
            </Link>
            <span>·</span>
            {/* Built with badge */}
            <span className="inline-flex items-center gap-1.5 text-zinc-600">
              Built with
              <span className="inline-flex items-center gap-1">
                <CoinbaseLogo className="w-3 h-3" />
                <span className="text-zinc-500 font-medium">x402</span>
              </span>
              <span className="text-zinc-700">+</span>
              <span className="inline-flex items-center gap-1">
                <WorldChainLogo className="w-3 h-3" />
                <span className="text-zinc-500 font-medium">World ID</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
