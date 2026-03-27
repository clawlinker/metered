'use client';

import Link from 'next/link';
import { Zap, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-white" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-none">Metered</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">The directory where trust pays off</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {/* Mobile: just Submit button */}
          <Button variant="default" size="sm" asChild className="md:hidden min-h-[44px]">
            <Link href="/submit">
              <Plus className="w-4 h-4 mr-1" />
              Submit
            </Link>
          </Button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/about"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
            >
              About
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors duration-150"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Analytics
            </Link>
            <ConnectButton
              showBalance={false}
              chainStatus="none"
              accountStatus="address"
            />
            <Button variant="default" size="sm" asChild>
              <Link href="/submit">Submit</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
