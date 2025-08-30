import { TreadPattern, TreadPatternModel } from "./data";

// --- START: Strapi API Type Definitions ---
// Based on the JSON response from the Strapi API

interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiImageFormat;
    small: StrapiImageFormat;
    medium: StrapiImageFormat;
    large: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown; // This field is not used, so 'unknown' is a safe type.
  createdAt: string;
  updatedAt: string;
}

interface StrapiDescriptionBlock {
  type: string;
  children: { type: string; text: string }[];
}

interface StrapiLoaiLop {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiProductDataItem {
  id: number;
  name: string;
  slug: string;
  description: StrapiDescriptionBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  loai_lop: StrapiLoaiLop;
  imageUrl: StrapiImage | null;
  models: TreadPatternModel[]; // This already matches our frontend model
}

// --- END: Strapi API Type Definitions ---

// Helper function to safely extract text from Strapi's Rich Text field
function extractDescription(description: StrapiDescriptionBlock[]): string {
    if (!description || !description[0] || !description[0].children || !description[0].children[0]) {
        return "";
    }
    return description[0].children[0].text;
}

// Helper function to get the full image URL
function getImageUrl(imageData: StrapiImage | null): string {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    if (imageData && imageData.url) {
        // If the URL is relative, prepend the Strapi URL
        return imageData.url.startsWith('http') ? imageData.url : `${strapiUrl}${imageData.url}`;
    }
    // Return a placeholder if no image is available
    return "https://placehold.co/600x600/eee/fff?text=No+Image";
}


// This function fetches all products from Strapi and maps them to the TreadPattern type.
export async function getProductsFromStrapi(): Promise<TreadPattern[]> {
    // Using the public API endpoint, no token needed.
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/san-phams?populate=*`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            // Implements Incremental Static Regeneration (ISR)
            next: {
                revalidate: 60 // Revalidate data every 60 seconds
            }
        });

        if (!response.ok) {
            console.error("Failed to fetch products from Strapi:", response.statusText);
            throw new Error('Failed to fetch products');
        }

        const strapiResponse = await response.json();

        // Strapi returns data in a nested structure, so we need to map it to our desired format.
        const products: TreadPattern[] = strapiResponse.data.map((item: StrapiProductDataItem): TreadPattern => {
            return {
                id: item.slug,
                name: item.name,
                type: item.loai_lop?.name || "Chưa phân loại",
                description: extractDescription(item.description),
                imageUrl: getImageUrl(item.imageUrl),
                models: item.models // Direct mapping as the structure is the same
            };
        });

        return products;

    } catch (error) {
        console.error("An error occurred while fetching from Strapi:", error);
        // Return empty array or mock data in case of error to prevent build failure
        return [];
    }
}

// This function fetches a single product by its slug using an efficient filter.
export async function getProductBySlug(slug: string): Promise<TreadPattern | null> {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/san-phams?filters[slug][$eq]=${slug}&populate=*`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            next: {
                revalidate: 60 // Also apply ISR to detail pages
            }
        });

        if (!response.ok) {
            console.error(`Failed to fetch product with slug ${slug}:`, response.statusText);
            return null;
        }

        const strapiResponse = await response.json();

        // The filter returns an array, we need the first element.
        if (!strapiResponse.data || strapiResponse.data.length === 0) {
            return null;
        }

        const item: StrapiProductDataItem = strapiResponse.data[0];

        // Map the single item to our TreadPattern type
        const product: TreadPattern = {
            id: item.slug,
            name: item.name,
            type: item.loai_lop?.name || "Chưa phân loại",
            description: extractDescription(item.description),
            imageUrl: getImageUrl(item.imageUrl),
            models: item.models
        };

        return product;

    } catch (error) {
        console.error(`An error occurred while fetching product with slug ${slug}:`, error);
        return null;
    }
}