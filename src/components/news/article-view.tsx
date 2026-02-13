'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import ShareButtons from '@/components/news/share-buttons';
import type { WP_Post } from '@/types/wordpress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import RelatedArticlesSection from './related-articles-section';
import { cn } from '@/lib/utils';
import BookmarkButton from './bookmark-button';

function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}

export default function ArticleView({ post, relatedPosts }: { post: WP_Post, relatedPosts: WP_Post[] }) {
    const originalTitle = useMemo(() => stripHtml(post.title.rendered), [post.title.rendered]);
    const originalContent = useMemo(() => post.content.rendered, [post.content.rendered]);
    
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || PlaceHolderImages[0].imageUrl;
    const imageHint = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || PlaceHolderImages[0].imageHint;
    const postDate = new Date(post.date);
    const authorName = post._embedded?.author?.[0]?.name;
    
    const formattedDate = format(postDate, "d MMMM yyyy", { locale: ar });

    return (
        <>
            <main className="container mx-auto max-w-4xl px-4 py-8">
                <article className="bg-card rounded-xl shadow-lg overflow-hidden">
                <div className="relative w-full aspect-video">
                    <Image
                    src={imageUrl}
                    alt={originalTitle}
                    fill
                    className="object-cover"
                    data-ai-hint={imageHint}
                    priority
                    />
                </div>
                <div className="p-6 md:p-10">
                    <div className="flex justify-between items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className='flex items-center gap-4'>
                            <Badge variant="secondary">
                            {formattedDate}
                            </Badge>
                            {authorName && <span>بواسطة: {authorName}</span>}
                        </div>
                        <BookmarkButton post={post} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold font-headline mb-6 text-card-foreground leading-tight">
                    {originalTitle}
                    </h1>
                    
                    <div
                        id="article-content-body"
                        className={cn(
                            "prose prose-lg max-w-none text-foreground prose-p:leading-relaxed prose-headings:font-headline prose-headings:text-card-foreground prose-a:text-primary hover:prose-a:underline"
                        )}
                        dangerouslySetInnerHTML={{ __html: originalContent }}
                    />
                </div>
                </article>
                <RelatedArticlesSection posts={relatedPosts} />
            </main>
            <ShareButtons title={originalTitle} url={`/article/${post.slug}`} />
        </>
    );
}
