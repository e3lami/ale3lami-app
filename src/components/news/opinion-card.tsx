import Link from 'next/link';
import Image from 'next/image';
import type { WP_Post } from '@/types/wordpress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Pen } from 'lucide-react';
import { stripHtml } from '@/lib/utils';

interface OpinionCardProps {
  post: WP_Post;
}

export default function OpinionCard({ post }: OpinionCardProps) {
  const title = stripHtml(post.title.rendered);
  const authorName = post._embedded?.author?.[0]?.name || 'كاتب';
  
  const imageUrl = post._embedded?.author?.[0]?.avatar_urls?.['96'] || `https://ui-avatars.com/api/?name=${authorName}&background=0D8ABC&color=fff`;
  const imageHint = authorName;


  return (
    <Link href={`/article/${post.slug}`} className="group block">
      <div className="flex flex-col h-full group">
        <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary">
              <Image
                src={imageUrl}
                alt={authorName}
                fill
                className="object-cover"
                data-ai-hint={imageHint}
              />
            </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-foreground">{authorName}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Pen className="h-4 w-4 text-primary"/>
              <span>مقالات رأي</span>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-bold leading-tight mt-4 group-hover:text-primary transition-colors font-headline">
          {title}
        </h3>
      </div>
    </Link>
  );
}
