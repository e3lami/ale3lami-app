'use client';

import { useSavedArticles } from '@/hooks/use-saved-articles';
import Header from '@/components/layout/header';
import SectionHeader from '@/components/home/section-header';
import ArticleCard from '@/components/news/article-card';

export default function SavedArticlesPage() {
  const { savedArticles } = useSavedArticles();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SectionHeader title="مقالاتي المحفوظة" />
        {savedArticles && savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {savedArticles.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>لا توجد مقالات محفوظة حالياً.</p>
          </div>
        )}
      </main>
    </>
  );
}
