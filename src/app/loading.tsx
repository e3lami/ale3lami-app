import Header from '@/components/layout/header';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Skeleton */}
        <div className="py-8 md:py-12">
            <Skeleton className="w-full aspect-[16/9] rounded-lg" />
        </div>

        {/* Sections Skeleton */}
        <div className="space-y-12">
            <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-[80%]" />
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-[80%]" />
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
