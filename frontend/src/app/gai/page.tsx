import { Suspense } from 'react';
import { getProductsFromStrapi } from '@/lib/strapi';
import GaiPageClient from './GaiPageClient';

export default async function AllTreadsPage() {
  const allProducts = await getProductsFromStrapi();

  return (
    <Suspense fallback={<div className="container mx-auto text-center py-10">Đang tải sản phẩm...</div>}>
      <GaiPageClient products={allProducts} />
    </Suspense>
  );
}
