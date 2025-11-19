import { notFound } from "next/navigation";
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
}

export default async function GaiDetailPage({ params }: GaiDetailPageProps) {
  const { slug } = await params;
  const pattern = await getProductBySlug(slug);

  if (!pattern) {
    notFound();
  }

  // Truyền prop images vào ProductDetailView (nếu có)
  return <ProductDetailView pattern={pattern} />;
}
