import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { WP_Post } from '@/types/wordpress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Pen } from 'lucide-react';

interface OpinionCardProps {
  post: WP_Post;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

export default function OpinionCard({ post }: OpinionCardProps) {
  const title = stripHtml(post.title.rendered);
  const authorName = post._embedded?.author?.[0]?.name || 'كاتب';
  
  const imageUrl = post._embedded?.author?.[0]?.avatar_urls?.['96'] || PlaceHolderImages[0].imageUrl;
  const imageHint = authorName;


  return (
    <Link href={`/article/${post.slug}`} className="group block">
      <div className="flex flex-col h-full group">
        <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={imageUrl}
                alt={authorName}
                fill
                className="object-cover"
                data-ai-hint={imageHint}
              />
            </div>
          <div>
            <p className="font-bold text-lg text-card-foreground">{authorName}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Pen className="h-4 w-4 text-primary"/>
              <span>مقالات رأي</span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold leading-tight mt-4 group-hover:text-primary transition-colors font-headline">
          {title}
        </h3>
      </div>
    </Link>
  );
}
