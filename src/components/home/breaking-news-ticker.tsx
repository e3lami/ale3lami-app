'use client';

import './breaking-news-ticker.css';
import type { WP_Post } from '@/types/wordpress';
import { Newspaper } from 'lucide-react';
import Link from 'next/link';
import { stripHtml } from '@/lib/utils';

interface BreakingNewsTickerProps {
    posts: WP_Post[];
}

export default function BreakingNewsTicker({ posts }: BreakingNewsTickerProps) {
    if (!posts || posts.length === 0) {
        return null;
    }

    // Duplicate posts to create a seamless loop
    const tickerPosts = [...posts, ...posts];

    return (
        <div className="bg-primary/10 border-y border-primary/20 text-primary-foreground relative flex overflow-hidden h-12 items-center">
            <div className="flex-shrink-0 z-10 bg-primary px-4 h-full flex items-center">
                <Newspaper className="h-6 w-6 mr-2 text-primary-foreground" />
                <span className="font-bold text-primary-foreground">منشورات</span>
            </div>
            <div className="w-full flex-1 min-w-0">
                <div className="ticker-wrapper">
                    <div className="ticker-content">
                        {tickerPosts.map((post, index) => (
                            <Link href={`/article/${post.slug}`} key={`${post.id}-${index}`} className="ticker-item px-6 text-sm font-semibold whitespace-nowrap hover:underline text-foreground">
                                {stripHtml(post.title.rendered)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
