import { TreadPattern, TreadPatternModel } from "./data";
import { type BlocksContent } from '@strapi/blocks-react-renderer';

export interface ContactFormData {
  name: string;
  phoneNumber: string;
  email?: string;
  requestType: string;
  description?: string;
}

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
  provider_metadata: any;
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
  imageUrl: StrapiImage[];
  models: TreadPatternModel[];
}

function extractDescription(description: StrapiDescriptionBlock[]): string {
    if (!description || !description[0] || !description[0].children || !description[0].children[0]) {
        return "";
    }
    return description[0].children[0].text;
}

interface ImageOptions {
  width: number;
  height: number;
  crop?: 'fill' | 'fit';
}

function getImageUrl(imageData: StrapiImage[] | null, options?: ImageOptions): string {
    if (imageData && imageData.length > 0) {
        const image = imageData[0];

        // If it's a Cloudinary image and options are provided, build a dynamic URL
        if (options && image.provider === 'cloudinary' && image.provider_metadata?.public_id) {
            const urlParts = image.url.split('/');
            const cloudNameIndex = urlParts.findIndex(part => part === 'res.cloudinary.com') + 1;
            const cloudName = urlParts[cloudNameIndex];

            if (cloudName) {
                const crop = options.crop || 'fill';
                // Add auto-quality (q_auto) and auto-format (f_auto) for best performance
                const transformations = `w_${options.width},h_${options.height},c_${crop},q_auto,f_auto`;
                return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${image.provider_metadata.public_id}`;
            }
        }

        // Fallback for local dev or other providers
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
        const fallbackUrl = image.formats?.medium?.url || image.url;
        return fallbackUrl.startsWith('http') ? fallbackUrl : `${strapiUrl}${fallbackUrl}`;
    }
    
    return "https://placehold.co/600x600/eee/fff?text=No+Image";
}

export async function getProductsFromStrapi(): Promise<TreadPattern[]> {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/san-phams?populate=*`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            // Revalidate data every 60 seconds for Incremental Static Regeneration (ISR)
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            console.error("Failed to fetch products from Strapi:", response.statusText);
            throw new Error('Failed to fetch products');
        }

        const strapiResponse = await response.json();

        const products: TreadPattern[] = strapiResponse.data.map((item: StrapiProductDataItem): TreadPattern => {
            return {
                id: item.slug,
                name: item.name,
                type: item.loai_lop?.name || "Chưa phân loại",
                description: extractDescription(item.description),
                imageUrl: getImageUrl(item.imageUrl, { width: 400, height: 400 }), 
                models: item.models,
            };
        });

        return products;

    } catch (error) {
        console.error("An error occurred while fetching from Strapi:", error);
        // Return empty array in case of error to prevent build failure
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<TreadPattern | null> {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/san-phams?filters[slug][$eq]=${slug}&populate=*`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            console.error(`Failed to fetch product with slug ${slug}:`, response.statusText);
            return null;
        }

        const strapiResponse = await response.json();

        if (!strapiResponse.data || strapiResponse.data.length === 0) {
            return null;
        }

        const item: StrapiProductDataItem = strapiResponse.data[0];

        const product: TreadPattern = {
            id: item.slug,
            name: item.name,
            type: item.loai_lop?.name || "Chưa phân loại",
            description: extractDescription(item.description),
            imageUrl: getImageUrl(item.imageUrl, { width: 600, height: 600 }), 
            models: item.models,
        };

        return product;

    } catch (error) {
        console.error(`An error occurred while fetching product with slug ${slug}:`, error);
        return null;
    }
}

export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/lien-hes`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Strapi expects the data to be nested under a 'data' key
            body: JSON.stringify({ data: formData }),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error("Failed to submit form to Strapi:", errorBody);
            throw new Error(errorBody.error?.message || 'Failed to submit form');
        }

        return { success: true };

    } catch (error) {
        console.error("An error occurred while submitting the contact form:", error);
        return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
}

export interface AboutPageContent {
  title: string;
  content: BlocksContent;
  heroUrl: string;
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/trang-gioi-thieu?populate=hero`;

    const defaultContent: AboutPageContent = {
        title: "Về Chúng Tôi",
        content: [{ type: 'paragraph', children: [{ type: 'text', text: 'Nội dung đang được cập nhật. Vui lòng quay lại sau.' }] }],
        heroUrl: "https://placehold.co/1200x400/eee/fff?text=EUROMA+TIRE",
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch About Us page content');
        }

        const strapiResponse = await response.json();
        const data = strapiResponse.data;

        if (!data) {
            return defaultContent;
        }

        return {
            title: data.title || defaultContent.title,
            content: data.content || defaultContent.content,
            heroUrl: getImageUrl(data.hero, { width: 1200, height: 400 }), 
        };

    } catch (error) {
        console.error("An error occurred while fetching the About Us page:", error);
        return {
            ...defaultContent,
            title: "Lỗi Tải Trang",
            content: [{ type: 'paragraph', children: [{ type: 'text', text: 'Đã có lỗi xảy ra khi tải nội dung. Vui lòng thử lại.' }] }],
            heroUrl: "https://placehold.co/1200x400/eee/fff?text=Error",
        };
    }
}

export interface LoaiLop {
  id: number;
  name: string;
}

export async function getLoaiLops(): Promise<LoaiLop[]> {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/loai-lops`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tire types');
        }

        const strapiResponse = await response.json();

        const loaiLops: LoaiLop[] = strapiResponse.data.map((item: any): LoaiLop => ({
            id: item.id,
            name: item.name,
        }));

        return loaiLops;

    } catch (error) {
        console.error("An error occurred while fetching tire types:", error);
        return [];
    }
}
