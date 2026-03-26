import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Large 404 */}
        <div className="relative mb-8">
          <span className="text-[9rem] font-black text-white/5 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-white/10 flex items-center justify-center">
              <Search className="w-9 h-9 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          Looks like this endpoint returned a 404. The service you're looking for
          might have been removed, renamed, or doesn't exist yet.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to directory
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Submit a service
          </Link>
        </div>
      </div>
    </div>
  );
}
