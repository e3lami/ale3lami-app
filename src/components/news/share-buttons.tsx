'use client';

import { useEffect, useState } from 'react';
import { Facebook, Twitter, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  title: string;
  url: string; // relative url
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    // This ensures window is available and runs only on the client
    setFullUrl(`${window.location.origin}${url}`);
  }, [url]);

  if (!fullUrl) {
    return null;
  }

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const openShareLink = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 notranslate">
        <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm" onClick={() => openShareLink(shareLinks.whatsapp)} aria-label="Share on WhatsApp">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm" onClick={() => openShareLink(shareLinks.facebook)} aria-label="Share on Facebook">
          <Facebook className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm" onClick={() => openShareLink(shareLinks.twitter)} aria-label="Share on Twitter">
          <Twitter className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm" onClick={() => openShareLink(shareLinks.telegram)} aria-label="Share on Telegram">
          <Send className="h-5 w-5" />
        </Button>
    </div>
  );
}
