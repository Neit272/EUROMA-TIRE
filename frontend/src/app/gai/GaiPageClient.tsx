'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { TreadPattern } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categoryMap: { [key: string]: string } = {
  'di-rung': 'Đi Rừng',
  'di-ruong': 'Đi Ruộng',
};

interface GaiPageClientProps {
  products: TreadPattern[];
}

export default function GaiPageClient({ products }: GaiPageClientProps) {
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
      return products;
    }
    const category = categoryMap[filter];
    return products.filter(p => p.type === category);
  }, [filter, products]);

  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Tất Cả Các Loại Gai Lốp</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Khám phá toàn bộ các loại gai lốp chất lượng cao của chúng tôi.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => handleFilterChange('all')}>Tất Cả</Button>
          <Button variant={filter === 'di-ruong' ? 'default' : 'outline'} onClick={() => handleFilterChange('di-ruong')}>Lốp Đi Ruộng</Button>
          <Button variant={filter === 'di-rung' ? 'default' : 'outline'} onClick={() => handleFilterChange('di-rung')}>Lốp Đi Rừng</Button>
        </div>
      </section>

      <section id="products" className="pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
