'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { treadPatterns } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categoryMap: { [key: string]: string } = {
  'di-rung': 'Đi Rừng',
  'di-ruong': 'Đi Ruộng',
};

// We create the main content as a separate component to use useSearchParams
function AllTreadsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';

  const [filter, setFilter] = useState(initialType);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    const newUrl = newFilter === 'all' ? '/gai' : `/gai?type=${newFilter}`;
    router.push(newUrl, { scroll: false });
  };

  const filteredPatterns = useMemo(() => {
    if (filter === 'all') {
      return treadPatterns;
    }
    const category = categoryMap[filter];
    return treadPatterns.filter(p => p.type === category);
  }, [filter]);

  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Tất Cả Các Loại Gai Lốp</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Khám phá toàn bộ các loại gai lốp chất lượng cao của chúng tôi.
          </p>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => handleFilterChange('all')}>Tất Cả</Button>
          <Button variant={filter === 'di-ruong' ? 'default' : 'outline'} onClick={() => handleFilterChange('di-ruong')}>Lốp Đi Ruộng</Button>
          <Button variant={filter === 'di-rung' ? 'default' : 'outline'} onClick={() => handleFilterChange('di-rung')}>Lốp Đi Rừng</Button>
        </div>
      </section>

      <section id="products" className="pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPatterns.map((pattern) => (
              <Link href={`/gai/${pattern.id}`} key={pattern.id} className="block group">
                <Card className="flex flex-col overflow-hidden h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                  <div className="p-0">
                    <Image
                      src={pattern.imageUrl}
                      alt={pattern.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-auto"
                    />
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <Badge variant={pattern.type === 'Đi Rừng' ? 'destructive' : 'secondary'}>
                      {pattern.type}
                    </Badge>
                    <h3 className="text-xl font-bold mt-2">{pattern.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {pattern.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// The main export uses Suspense to wait for client-side rendering
export default function AllTreadsPage() {
    return (
        <Suspense fallback={<div>Đang tải...</div>}>
            <AllTreadsPageContent />
        </Suspense>
    )
}