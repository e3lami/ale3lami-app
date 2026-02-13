'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { WP_Post } from '@/types/wordpress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale/ar';
import { cn, stripHtml } from '@/lib/utils';

interface ArticleCardProps {
  post: WP_Post;
  layout?: 'vertical' | 'horizontal';
}

export default function ArticleCard({ post, layout = 'vertical' }: ArticleCardProps) {
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || PlaceHolderImages[0].imageUrl;
  const imageHint = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || PlaceHolderImages[0].imageHint;

  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered);
  const postDate = new Date(post.date);

  const formattedDate = format(postDate, "d MMMM yyyy", { locale: ar });

  const isHorizontal = layout === 'horizontal';

  return (
    <Link href={`/article/${post.slug}`} className="group block">
      <Card className={cn("h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/50 backdrop-blur-sm border border-white/10", isHorizontal && "md:flex-row")}>
        <CardHeader className="p-0 relative">
          <div className={cn("overflow-hidden", isHorizontal ? "md:w-48 flex-shrink-0 aspect-square" : "aspect-video")}>
            <Image
              src={imageUrl}
              alt={title}
              width={isHorizontal ? 200 : 600}
              height={isHorizontal ? 200 : 400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <Badge variant="secondary" className="mb-2 w-fit">
            {formattedDate}
          </Badge>
          <CardTitle className={cn("font-bold leading-tight mb-2 group-hover:text-primary transition-colors", isHorizontal ? "text-base" : "text-lg")}>
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground flex-grow">
            {excerpt.length > 100 ? `${excerpt.substring(0, 100)}...` : excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
