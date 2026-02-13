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
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
        {posts.map((post) => (
          <div key={post.id} className="flex-shrink-0 w-[80vw] sm:w-[40vw] md:w-[28vw] lg:w-[22vw]">
            <ArticleCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
