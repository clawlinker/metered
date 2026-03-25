'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Metered</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/submit">
            <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors">
              Submit Service
            </button>
          </Link>
          <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/5 transition-colors">
            Connect Wallet
          </button>
        </nav>
      </div>
    </header>
  );
}
