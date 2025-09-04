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
  params: { slug: string };
}

export default async function GaiDetailPage({ params }: GaiDetailPageProps) {
  const pattern = await getProductBySlug(params.slug);

  if (!pattern) {
    notFound();
  }

  return <ProductDetailView pattern={pattern} />;
}
