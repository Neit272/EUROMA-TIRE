import Image from "next/image";
import { getAboutPageContent } from "@/lib/strapi";
import { AboutContent } from "./AboutContent";

// This page is revalidated on-demand or every 60 seconds
export const revalidate = 60;

export default async function AboutPage() {
  const data = await getAboutPageContent();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full">
        <Image 
          src={data.heroUrl}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            {data.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <AboutContent content={data.content} />
        </div>
      </div>
    </div>
  );
}
