import Link from 'next/link';
import { Zap } from 'lucide-react';

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
          </div>

          {/* Links */}
          <nav className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Directory</p>
              <Link href="/" className="text-zinc-500 hover:text-white transition-colors min-h-[44px] flex items-center">Browse All</Link>
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
          <div className="flex items-center gap-4 text-xs text-zinc-600">
            <a href="https://x402.codes" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
              x402 Docs
            </a>
            <span>·</span>
            <Link href="/submit" className="hover:text-zinc-400 transition-colors">
              List Your API
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
