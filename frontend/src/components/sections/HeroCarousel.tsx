import { getHomepageHeroImageUrls } from "@/lib/strapi";
import Image from "next/image";

export async function HeroCarousel() {
  const imageUrls = await getHomepageHeroImageUrls();

  if (imageUrls.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center bg-gray-200">
        <p className="text-muted-foreground">Hero images are not configured.</p>
      </div>
    );
  }

  const duplicatedUrls = [...imageUrls, ...imageUrls];

  return (
    <div className="w-full overflow-hidden group">
      <div className="flex animate-scroll will-change-transform">
        {duplicatedUrls.map((url, index) => (
          <div key={index} className="relative flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-48 md:h-64">
            <Image
              src={url}
              alt={`Hero image ${index + 1}`}
              fill
              className="object-cover p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
