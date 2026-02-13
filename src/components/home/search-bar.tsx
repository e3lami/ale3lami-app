'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="container mx-auto px-4 my-6">
      <div className="relative">
        <Input
          type="search"
          placeholder="بحث عن أخبار..."
          className="w-full pl-12 h-12 text-lg rounded-lg border-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
          aria-label="Search"
        >
          <Search className="h-6 w-6" />
        </Button>
      </div>
    </form>
  );
}
