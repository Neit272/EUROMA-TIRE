import { notFound } from "next/navigation";
import { getProductBySlug, getProductsFromStrapi } from "@/lib/strapi";
import { ProductDetailView } from "./ProductDetailView";

// generateStaticParams pre-builds all product pages for better performance and SEO
export async function generateStaticParams() {
  const products = await getProductsFromStrapi();
  
  return products.map((product) => ({
    slug: product.id,
  }));
}

// Define a specific interface for the page props
interface GaiDetailPageProps {
  params: { slug: string };
}

// The page component now fetches data and passes it to the client component.
export default async function GaiDetailPage({ params }: GaiDetailPageProps) {
  const pattern = await getProductBySlug(params.slug);

  if (!pattern) {
    notFound();
  }

  return <ProductDetailView pattern={pattern} />;
}
