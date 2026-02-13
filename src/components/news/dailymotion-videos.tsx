'use client';

import type { DailymotionVideo } from '@/types/dailymotion';
import SectionHeader from '../home/section-header';
import VideoCard from './video-card';
import { Video } from 'lucide-react';

interface DailymotionVideosProps {
  videos: DailymotionVideo[];
}

export default function DailymotionVideos({ videos }: DailymotionVideosProps) {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 py-8 border-t border-white/10">
      <SectionHeader title={'آخر الفيديوهات - قناة موقع الاعلامي'} icon={Video} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
