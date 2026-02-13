'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchOverlayProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function SearchOverlay({ isOpen, onOpenChange }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the input when the dialog opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      onOpenChange(false); // Close the dialog after search
      setSearchTerm('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/80 backdrop-blur-xl border-0 shadow-2xl p-0 h-screen sm:h-auto sm:max-w-2xl">
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                placeholder="بحث عن أخبار..."
                className="w-full pl-12 h-14 text-lg bg-black/20 border-border focus:ring-primary rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-14">
              بحث
            </Button>
          </form>
           <div className="mt-6">
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                    كلمات مفتاحية شائعة:
                </p>
                <div className="flex flex-wrap gap-2">
                    {['لبنان', 'بيروت', 'اقتصاد', 'رياضة', 'تكنولوجيا'].map(keyword => (
                        <Button key={keyword} variant="secondary" size="sm" onClick={() => {
                            router.push(`/search?q=${encodeURIComponent(keyword)}`);
                            onOpenChange(false);
                        }}>
                            {keyword}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            onClick={() => onOpenChange(false)}
        >
            <X className="h-6 w-6" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
