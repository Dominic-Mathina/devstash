export default function DashboardLoading() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar skeleton */}
      <div className="w-64 border-r flex flex-col gap-4 p-4 shrink-0">
        <div className="h-8 w-8 rounded-md bg-muted animate-pulse self-end" />
        <div className="space-y-2 mt-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-2">
              <div className="h-4 w-4 rounded bg-muted animate-pulse shrink-0" />
              <div className="h-3 flex-1 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-3 w-20 rounded bg-muted animate-pulse mx-2" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-3 mx-2 rounded bg-muted animate-pulse" />
          ))}
        </div>
      </div>

      {/* Main area skeleton */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b p-4 flex gap-3">
          <div className="h-9 flex-1 rounded-md bg-muted animate-pulse" />
          <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
        </div>
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
