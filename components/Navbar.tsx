'use client';

import Link from 'next/link';
import { Zap, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-white" />
          <span className="text-lg font-bold text-white">Metered</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant="default" size="sm" asChild className="md:hidden">
            <Link href="/submit">
              <Plus className="w-4 h-4 mr-1" />
              Submit
            </Link>
          </Button>
          <div className="hidden md:flex items-center gap-2">
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
