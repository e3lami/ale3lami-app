'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import type { WP_Post } from '@/types/wordpress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn, stripHtml } from '@/lib/utils';

interface HeroSliderProps {
  posts: WP_Post[];
}

export default function HeroSlider({ posts }: HeroSliderProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="py-8 md:py-12 relative container mx-auto px-4">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
          direction: 'rtl',
        }}
      >
        <CarouselContent>
          {posts.map((post, index) => {
            const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || PlaceHolderImages[0].imageUrl;
            const imageHint = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || PlaceHolderImages[0].imageHint;
            const title = stripHtml(post.title.rendered);

            return (
              <CarouselItem key={post.id}>
                <Link href={`/article/${post.slug}`} className="group block">
                  <Card className="overflow-hidden border-none shadow-2xl shadow-black/50 rounded-2xl">
                    <CardContent className="p-0 relative aspect-[16/9] md:aspect-[21/9]">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={imageHint}
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 right-0 p-6 md:p-10">
                        <h2 className="text-2xl md:text-5xl font-bold text-white font-headline leading-tight drop-shadow-lg">
                          {title}
                        </h2>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 text-white bg-black/30 hover:bg-black/50 border-none disabled:hidden" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 text-white bg-black/30 hover:bg-black/50 border-none disabled:hidden" />
      </Carousel>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" dir="ltr">
        {posts.map((_, index) => (
            <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                    "h-2 w-2 rounded-full bg-white/50 transition-all duration-300",
                    current === index ? "w-6 bg-white" : "hover:bg-white/80"
                )}
                aria-label={`Go to slide ${index + 1}`}
            />
        ))}
      </div>
    </div>
  );
}
