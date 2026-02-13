'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArticleCard from './article-card';
import type { WP_Post } from '@/types/wordpress';

interface NewsTabsProps {
  tabs: {
    name: string;
    posts: WP_Post[];
  }[];
}

export default function NewsTabs({ tabs }: NewsTabsProps) {
  return (
    <Tabs defaultValue={tabs[0]?.name} className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-muted/50 rounded-lg">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.name} value={tab.name} className="text-base font-semibold">
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.name} value={tab.name} className="mt-6">
          {tab.posts && tab.posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tab.posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>لا توجد مقالات في هذا القسم حالياً.</p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
