'use client';

import Link from 'next/link';
import SearchOverlay from '@/components/search/search-overlay';
import { Button } from '../ui/button';
import { DollarSign, Search, Sun } from 'lucide-react';
import { useState } from 'react';
import DesktopNav from './desktop-nav';

export default function Header() {
  const logoUrl = "https://ale3lami.com/wp-content/uploads/2024/03/logo-ale3lami.png";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <>
    <div className="bg-card/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
              <div className="flex-1 flex justify-start">
                 <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                      <Search className="h-5 w-5" />
                      <span className="sr-only">Search</span>
                  </Button>
              </div>
              <div className="flex-1 flex justify-center">
                   <Link href="/" className="flex items-center gap-3">
                      {logoError ? (
                        <span className="text-2xl font-bold font-headline">الأعلامي</span>
                      ) : (
                        <img
                            src={logoUrl}
                            alt="الأعلامي"
                            style={{ height: '60px', objectFit: 'contain' }}
                            onError={() => setLogoError(true)}
                        />
                      )}
                  </Link>
              </div>
              <div className="flex-1 flex justify-end items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 p-2 rounded-lg bg-black/20">
                      <Sun className="h-4 w-4 text-yellow-400" />
                      <span className="font-bold">28°C</span>
                  </div>
                   <div className="hidden md:flex items-center gap-1 p-2 rounded-lg bg-black/20">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="font-bold">95,000</span>
                  </div>
              </div>
          </div>
        </div>
      </header>
      <DesktopNav />
    </div>
    <SearchOverlay isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
