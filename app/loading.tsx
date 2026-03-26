export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Subtitle skeleton */}
        <div className="flex justify-center mb-8">
          <div className="h-4 w-56 bg-white/5 rounded animate-pulse" />
        </div>

        {/* Search skeleton */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="h-10 w-full bg-white/5 rounded-lg animate-pulse" />
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-2 mb-6">
          {[80, 100, 90, 60].map((w, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-white/5 animate-pulse"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        {/* Category filter skeleton */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[50, 70, 80, 60, 75, 65, 55].map((w, i) => (
            <div
              key={i}
              className="h-7 rounded-full bg-white/5 animate-pulse"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        {/* Section title skeleton */}
        <div className="h-6 w-40 bg-white/5 rounded animate-pulse mb-6" />

        {/* Service list skeleton */}
        <div className="flex flex-col rounded-xl overflow-hidden border border-white/5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 py-3 px-4 border-b border-white/5 last:border-b-0"
            >
              {/* Rank */}
              <div className="w-5 h-4 bg-white/5 rounded animate-pulse hidden md:block mt-1 flex-shrink-0" />
              {/* Thumbnail */}
              <div className="w-12 h-12 rounded-lg bg-white/5 animate-pulse flex-shrink-0" />
              {/* Info */}
              <div className="flex-1 min-w-0 space-y-2 py-0.5">
                <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-3 w-14 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
              {/* Upvote */}
              <div className="w-12 h-12 rounded-lg bg-white/5 animate-pulse flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
