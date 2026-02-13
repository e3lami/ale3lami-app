'use client';

import Link from 'next/link';

export default function Header() {
  const logoUrl = "https://ale3lami.com/wp-content/uploads/2024/03/logo-ale3lami.png";

  return (
    <header className="bg-card sticky top-0 z-40 shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="Al-E3lami News Hub Logo"
                style={{ height: '60px', objectFit: 'contain' }}
              />
            </Link>
        </div>
      </div>
    </header>
  );
}
