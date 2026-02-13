import Header from '@/components/layout/header';
import { Skeleton } from '@/components/ui/skeleton';

export default function SavedLoading() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </main>
    </>
  );
}
