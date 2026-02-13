import Header from '@/components/layout/header';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleLoading() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-card rounded-xl shadow-lg overflow-hidden">
          <Skeleton className="w-full aspect-video" />
          <div className="p-6 md:p-10 space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
            <Skeleton className="h-10 w-3/4" />
            <div className="space-y-4 mt-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[90%]" />
              <Skeleton className="h-5 w-[95%]" />
              <Skeleton className="h-5 w-full" />
               <Skeleton className="h-5 w-[80%]" />
            </div>
          </div>
        </div>
        
        {/* Skeleton for Related Articles */}
        <div className="mt-12 py-8 border-t">
            <Skeleton className="h-8 w-48 mb-6" />
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
        </div>

      </main>
    </>
  );
}
