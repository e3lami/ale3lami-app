'use client';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import ShareButtons from '@/components/news/share-buttons';
import type { WP_Post } from '@/types/wordpress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale/ar';
import RelatedArticlesSection from './related-articles-section';
import { cn, stripHtml } from '@/lib/utils';
import { Bot, Send } from 'lucide-react';
import type { DailymotionVideo } from '@/types/dailymotion';
import DailymotionVideos from './dailymotion-videos';

type ArticleViewProps = { 
    post: WP_Post;
    relatedPosts: WP_Post[];
    videos: DailymotionVideo[];
}

export default function ArticleView({ post, relatedPosts, videos }: ArticleViewProps) {
    const title = stripHtml(post.title.rendered);
    const contentHtml = post.content.rendered;
    
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || PlaceHolderImages[0].imageUrl;
    const imageHint = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || PlaceHolderImages[0].imageHint;
    const postDate = new Date(post.date);
    const authorName = post._embedded?.author?.[0]?.name;
    
    const formattedDate = format(postDate, "d MMMM yyyy", { locale: ar });

    return (
        <>
            <main className="container mx-auto max-w-4xl px-4 py-8">
                <article className="bg-card/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/10">
                <div className="relative w-full aspect-video">
                    <Image
                    src={imageUrl}
                    alt={title}
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
                    </div>

                    <h1 className="text-xl md:text-3xl font-bold font-headline mb-6 text-foreground leading-tight">
                        {title}
                    </h1>
                    
                    <div
                        id="article-content-body"
                        className={cn(
                            "prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline prose-p:leading-relaxed"
                        )}
                        style={{ lineHeight: 1.8 }}
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </div>
                </article>
                <div className="my-12 flex flex-col items-center gap-4">
                    <a
                        href="https://t.me/ale3lami"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white rounded-lg transition-transform hover:scale-105"
                        style={{ backgroundColor: '#0088cc' }}
                    >
                        <Send className="h-6 w-6" />
                        <span>انضم إلينا على تليجرام</span>
                    </a>
                     <a
                        href="https://hadis.zapier.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-primary-foreground bg-primary rounded-lg transition-transform hover:scale-105"
                    >
                        <Bot className="h-6 w-6" />
                        <span>مساعد موقع الإعلامي</span>
                    </a>
                </div>
                <RelatedArticlesSection posts={relatedPosts} />
                <DailymotionVideos videos={videos} />
            </main>
            <ShareButtons title={title} url={`/article/${post.slug}`} />
        </>
    );
}
