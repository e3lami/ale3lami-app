'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Landmark, Newspaper, PenSquare, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'الرئيسية', icon: Home, slug: '' },
  { href: '/category/politics', label: 'السياسية', icon: Landmark, slug: 'politics' },
  { href: '/category/miscellaneous', label: 'متفرقات', icon: Newspaper, slug: 'miscellaneous' },
  { href: '/category/opinions', label: 'أقلام', icon: PenSquare, slug: 'opinions' },
  { href: '/saved', label: 'محفوظاتي', icon: Bookmark, slug: 'saved' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t z-50">
      <div className="container mx-auto flex justify-around items-center h-full max-w-md">
        {navItems.map((item) => {
          const isActive = (item.href === '/' && pathname === '/') || (item.slug && pathname.includes(item.slug));
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center flex-1 h-full">
              <item.icon
                className={cn(
                  'h-6 w-6 mb-1 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span
                className={cn(
                  'text-xs font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
