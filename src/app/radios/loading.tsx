import Header from '@/components/layout/header';
import { Skeleton } from '@/components/ui/skeleton';

export default function RadiosLoading() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <Skeleton className="w-full h-[60vh] rounded-lg" />
      </main>
    </>
  );
}
