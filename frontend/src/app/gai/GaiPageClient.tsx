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
              <Link href={`/gai/${pattern.id}`} key={pattern.id} className="block">
                <Card className="group overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={pattern.imageUrl}
                      alt={pattern.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out max-md:hidden">
                      <Button>Xem Chi Tiết</Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant={pattern.type === 'Đi Rừng' ? 'destructive' : 'secondary'}>
                      {pattern.type}
                    </Badge>
                    <h3 className="text-xl font-bold mt-2">{pattern.name}</h3>
                  </CardContent>
                  <div className="px-4 pb-4 md:hidden">
                    <Button className="w-full" variant="outline">Xem Chi Tiết</Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
