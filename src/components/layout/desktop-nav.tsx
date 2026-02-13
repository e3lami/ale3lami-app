'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_CATEGORIES } from '@/lib/categories';

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex justify-center items-center h-12 border-t border-white/10">
      <div className="flex gap-8">
        {NAV_CATEGORIES.map((item) => {
            const href = item.slug ? `/category/${item.slug}` : '/';
            const isActive = (href === '/' && pathname === '/') || (item.slug && pathname.includes(item.slug));

            return (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        'font-medium transition-colors hover:text-primary',
                        isActive ? 'text-primary' : 'text-foreground'
                    )}
                >
                    {item.name}
                </Link>
            );
        })}
      </div>
    </nav>
  );
}
