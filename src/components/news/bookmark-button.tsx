'use client';

import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSavedArticles } from '@/hooks/use-saved-articles';
import type { WP_Post } from '@/types/wordpress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BookmarkButtonProps {
  post: WP_Post;
  className?: string;
}

export default function BookmarkButton({ post, className }: BookmarkButtonProps) {
  const { toggleSaveArticle, isArticleSaved } = useSavedArticles();
  const isSaved = isArticleSaved(post.id);
  const { toast } = useToast();

  const handleToggle = () => {
    toggleSaveArticle(post);
    if (isSaved) {
      toast({
        title: 'تمت الإزالة',
        description: 'تمت إزالة المقال من قائمة المحفوظات.',
      });
    } else {
      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ المقال في قائمة المحفوظات.',
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('rounded-full h-8 w-8', className)}
      onClick={handleToggle}
      aria-label={isSaved ? 'إزالة من المحفوظات' : 'حفظ لوقت لاحق'}
    >
      <Bookmark className={cn('h-5 w-5', isSaved ? 'fill-primary text-primary' : 'text-muted-foreground')} />
    </Button>
  );
}
