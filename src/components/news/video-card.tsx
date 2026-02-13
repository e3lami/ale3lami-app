'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import type { DailymotionVideo } from '@/types/dailymotion';

interface VideoCardProps {
  video: DailymotionVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={video.url} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/50 backdrop-blur-sm border border-white/10">
        <CardContent className="p-0 relative">
          <div className="aspect-video overflow-hidden relative">
            <Image
              src={video.thumbnail_360_url}
              alt={video.title}
              width={600}
              height={338}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="h-16 w-16 text-white/80" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold leading-tight group-hover:text-primary transition-colors text-base line-clamp-2 h-12">
              {video.title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
