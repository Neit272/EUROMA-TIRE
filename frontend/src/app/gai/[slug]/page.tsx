import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductBySlug, getProductsFromStrapi } from "@/lib/strapi";
import { ProductDetailView } from "./ProductDetailView";

export async function generateStaticParams() {
  const products = await getProductsFromStrapi();
  
  return products.map((product) => ({
    slug: product.id,
  }));
}

interface GaiDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sku?: string }>;
}

export default async function GaiDetailPage({ params, searchParams }: GaiDetailPageProps) {
  const { slug } = await params;
  const { sku } = await searchParams;
  const pattern = await getProductBySlug(slug);

  if (!pattern) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Đang tải...</div>}>
      <ProductDetailView pattern={pattern} selectedSku={sku} />
    </Suspense>
  );
}