'use client';

import type { WP_Post } from '@/types/wordpress';
import ArticleCard from '@/components/news/article-card';
import SectionHeader from '../home/section-header';

interface RelatedArticlesSectionProps {
  posts: WP_Post[];
}

export default function RelatedArticlesSection({ posts }: RelatedArticlesSectionProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 py-8 border-t">
      <SectionHeader title={'قد يعجبك أيضاً'} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
