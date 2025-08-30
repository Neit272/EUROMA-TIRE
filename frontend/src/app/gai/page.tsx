// This is the Server Component wrapper
import { Suspense } from 'react';
import { getProductsFromStrapi } from '@/lib/strapi';
import GaiPageClient from './GaiPageClient';

export default async function AllTreadsPage() {
  // 1. Fetch data on the server
  const allProducts = await getProductsFromStrapi();

  // 2. Pass data to the client component
  return (
    <Suspense fallback={<div className="container mx-auto text-center py-10">Đang tải sản phẩm...</div>}>
      <GaiPageClient products={allProducts} />
    </Suspense>
  );
}
