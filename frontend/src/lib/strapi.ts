
import { TreadPattern, TreadPatternModel } from "./data";

// Helper function to safely extract text from Strapi's Rich Text field
function extractDescription(description: any[]): string {
    if (!description || !description[0] || !description[0].children || !description[0].children[0]) {
        return "";
    }
    return description[0].children[0].text;
}

// Helper function to get the full image URL
function getImageUrl(imageData: any): string {
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
        const products: TreadPattern[] = strapiResponse.data.map((item: any): TreadPattern => {
            return {
                id: item.slug,
                name: item.name,
                type: item.loai_lop?.name || "Chưa phân loại",
                description: extractDescription(item.description),
                imageUrl: getImageUrl(item.imageUrl),
                models: item.models.map((model: any): TreadPatternModel => ({
                    sku: model.sku,
                    size: model.size,
                    ply: model.ply,
                    weight: model.weight,
                    diameter: model.diameter,
                    sectionWidth: model.sectionWidth,
                    treadWidth: model.treadWidth,
                    treadCount: model.treadCount,
                    treadDepth: model.treadDepth,
                    inflationPressure: model.inflationPressure,
                }))
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

        const item = strapiResponse.data[0];

        // Map the single item to our TreadPattern type
        const product: TreadPattern = {
            id: item.slug,
            name: item.name,
            type: item.loai_lop?.name || "Chưa phân loại",
            description: extractDescription(item.description),
            imageUrl: getImageUrl(item.imageUrl),
            models: item.models.map((model: any): TreadPatternModel => ({
                sku: model.sku,
                size: model.size,
                ply: model.ply,
                weight: model.weight,
                diameter: model.diameter,
                sectionWidth: model.sectionWidth,
                treadWidth: model.treadWidth,
                treadCount: model.treadCount,
                treadDepth: model.treadDepth,
                inflationPressure: model.inflationPressure,
            }))
        };

        return product;

    } catch (error) {
        console.error(`An error occurred while fetching product with slug ${slug}:`, error);
        return null;
    }
}
