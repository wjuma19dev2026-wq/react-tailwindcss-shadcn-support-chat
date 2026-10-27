export const ClientDetailsSkeleton = () => {
  return (
    <div className="w-80 border-l animate-pulse">
      <div className="h-14 border-b px-4 flex items-center">
        <div className="h-4 w-28 rounded bg-muted/80" />
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center pb-6 border-b">
          <div className="h-20 w-20 rounded-full bg-muted/80 mb-3" />
          <div className="h-5 w-32 rounded bg-muted/80 mb-2" />
          <div className="h-4 w-24 rounded bg-muted/80 mb-2" />
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-muted/80 mr-1" />
            <div className="h-3 w-12 rounded bg-muted/80" />
          </div>
        </div>

        <div className="py-4 space-y-4">
          <div>
            <div className="h-4 w-32 rounded bg-muted/80 mb-2" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="h-3 w-16 rounded bg-muted/80" />
                <div className="h-3 w-24 rounded bg-muted/80" />
              </div>
              <div className="flex justify-between text-sm">
                <div className="h-3 w-16 rounded bg-muted/80" />
                <div className="h-3 w-20 rounded bg-muted/80" />
              </div>
              <div className="flex justify-between text-sm">
                <div className="h-3 w-16 rounded bg-muted/80" />
                <div className="h-3 w-20 rounded bg-muted/80" />
              </div>
            </div>
          </div>

          <div>
            <div className="h-4 w-28 rounded bg-muted/80 mb-2" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="h-3 w-16 rounded bg-muted/80" />
                <div className="h-3 w-20 rounded bg-muted/80" />
              </div>
              <div className="flex justify-between text-sm">
                <div className="h-3 w-24 rounded bg-muted/80" />
                <div className="h-3 w-16 rounded bg-muted/80" />
              </div>
              <div className="flex justify-between text-sm">
                <div className="h-3 w-20 rounded bg-muted/80" />
                <div className="h-3 w-12 rounded bg-muted/80" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="h-9 w-full rounded-md bg-muted/80" />
        </div>
      </div>
    </div>
  )
}
