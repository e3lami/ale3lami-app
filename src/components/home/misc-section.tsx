'use client';
import type { WP_Post } from '@/types/wordpress';
import ArticleCard from '@/components/news/article-card';
import SectionHeader from './section-header';

interface MiscSectionProps {
  posts: WP_Post[];
}

export default function MiscSection({ posts }: MiscSectionProps) {
  if (!posts || posts.length === 0) {
    return null;
  }
  return (
    <section className="py-8">
      <SectionHeader title={'متفرقات'} />
      <div className="space-y-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} layout="horizontal" />
        ))}
      </div>
    </section>
  );
}
