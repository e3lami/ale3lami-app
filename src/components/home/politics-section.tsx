'use client';
import type { WP_Post } from '@/types/wordpress';
import ArticleCard from '@/components/news/article-card';
import SectionHeader from './section-header';

interface PoliticsSectionProps {
  posts: WP_Post[];
}

export default function PoliticsSection({ posts }: PoliticsSectionProps) {
  if (!posts || posts.length === 0) {
    return null;
  }
  return (
    <section className="py-8">
      <SectionHeader title={'السياسية'} accentColor="#EF4444" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
