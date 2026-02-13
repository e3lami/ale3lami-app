'use client';
import type { WP_Post } from '@/types/wordpress';
import OpinionCard from '@/components/news/opinion-card';
import SectionHeader from './section-header';
import { Pen } from 'lucide-react';

interface OpinionsSectionProps {
  posts: WP_Post[];
}

export default function OpinionsSection({ posts }: OpinionsSectionProps) {
  if (!posts || posts.length === 0) {
    return null;
  }
  return (
    <section className="py-8 my-8 bg-card/50 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
            <SectionHeader title={'أقلام'} icon={Pen} />
            <div className="flex flex-col divide-y divide-white/10">
                {posts.map((post) => (
                    <div key={post.id} className="py-6">
                        <OpinionCard post={post} />
                    </div>
                ))}
            </div>
      </div>
    </section>
  );
}
