'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Metered</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white border-transparent">
            <Link href="/submit">Submit Service</Link>
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-white/5 hover:text-white">
            Connect Wallet
          </Button>
        </nav>
      </div>
    </header>
  );
}
