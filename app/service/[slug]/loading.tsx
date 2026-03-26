export default function ServiceLoading() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Back button skeleton */}
        <div className="h-8 w-24 bg-white/5 rounded animate-pulse mb-8" />

        {/* Header card skeleton */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 mb-6">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-white/5 animate-pulse flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-3">
              {/* Name + badges */}
              <div className="flex items-center gap-3">
                <div className="h-6 w-40 bg-white/5 rounded animate-pulse" />
                <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse" />
              </div>
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
              </div>
              {/* Meta row */}
              <div className="flex gap-3">
                <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
            {/* Upvote button */}
            <div className="w-14 h-14 rounded-lg bg-white/5 animate-pulse flex-shrink-0" />
          </div>
        </div>

        {/* Stats row skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="h-3 w-20 bg-white/5 rounded animate-pulse mb-2" />
              <div className="h-6 w-12 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* About section skeleton */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 mb-6">
          <div className="h-5 w-24 bg-white/5 rounded animate-pulse mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
          </div>
        </div>

        {/* Pricing section skeleton */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 mb-6">
          <div className="h-5 w-20 bg-white/5 rounded animate-pulse mb-4" />
          <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
