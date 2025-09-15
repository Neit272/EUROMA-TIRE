import { TreadPattern, TreadPatternModel, StrapiImage } from "./data";
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import qs from 'qs';

export interface ContactFormData {
  name: string;
  phoneNumber: string;
  email?: string;
  requestType: string;
  description?: string;
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
    thumbnail?: StrapiImage | null;
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

export function getImageUrl(imageData: StrapiImage[] | null, options?: ImageOptions): string {
    if (!imageData || imageData.length === 0 || !imageData[0]) {
        return "https://placehold.co/600x600/eee/fff.png?text=No+Image";
    }
    const image = imageData[0];

    if (options && image.provider === 'cloudinary' && image.url) {
        const transformations = `w_${options.width},h_${options.height},c_${options.crop || 'fill'},q_auto,f_auto`;
        if (image.url.includes('/upload/')) {
            return image.url.replace('/upload/', `/upload/${transformations}/`);
        }
    }

    if (image.url) {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
        const fallbackUrl = image.formats?.medium?.url || image.url;
        return fallbackUrl.startsWith('http') ? fallbackUrl : `${strapiUrl}${fallbackUrl}`;
    }

    return "https://placehold.co/600x600/eee/fff.png?text=No+Image";
}

export async function getProductsFromStrapi(): Promise<TreadPattern[]> {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/san-phams?populate=*`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            console.error("Failed to fetch products from Strapi:", response.statusText);
            throw new Error('Failed to fetch products');
        }

        const strapiResponse = await response.json();

        const products: TreadPattern[] = strapiResponse.data.map((item: StrapiProductDataItem): TreadPattern => {
            let thumbnailUrl = "https://placehold.co/400x400/eee/fff.png?text=No+Image";
            if (item.thumbnail) {
                thumbnailUrl = getImageUrl([item.thumbnail], { width: 400, height: 400 });
            } else if (item.imageUrl && Array.isArray(item.imageUrl) && item.imageUrl.length > 0) {
                thumbnailUrl = getImageUrl([item.imageUrl[0]], { width: 400, height: 400 });
            }
            return {
                id: item.slug,
                name: item.name,
                type: item.loai_lop?.name || "Chưa phân loại",
                description: extractDescription(item.description),
                imageUrl: thumbnailUrl,
                models: item.models,
            };
        });

        return products;

    } catch (error) {
        console.error("An error occurred while fetching from Strapi:", error);
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<TreadPattern | null> {
    const query = qs.stringify({
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: ['loai_lop', 'models.images'],
    });
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/san-phams?${query}`;

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
            imageUrl: getImageUrl(item.models?.[0]?.images ?? null, { width: 400, height: 400 }) || "https://placehold.co/400x400",
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

    const payload = { ...formData };

    if (payload.email === '') {
        delete payload.email;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: payload }),
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

interface StrapiLoaiLopDataItem {
  id: number;
  name: string;
  description: StrapiDescriptionBlock[];
  image: StrapiImage | null;
}

export interface LoaiLop {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export async function getLoaiLops(): Promise<LoaiLop[]> {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/loai-lops?fields=name,description&populate=image`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tire types');
        }

        const strapiResponse = await response.json();

        const loaiLops: LoaiLop[] = strapiResponse.data.map((item: StrapiLoaiLopDataItem): LoaiLop => ({
            id: item.id,
            name: item.name,
            description: extractDescription(item.description),
            imageUrl: getImageUrl(item.image ? [item.image] : null, { width: 600, height: 400, crop: 'fill' }),
        }));

        return loaiLops;

    } catch (error) {
        console.error("An error occurred while fetching tire types:", error);
        return [];
    }
}

export async function getHomepageHeroImageUrls(): Promise<string[]> {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/trang-chus?populate=hero`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch homepage content');
        }

        const strapiResponse = await response.json();
        const data = Array.isArray(strapiResponse.data) ? strapiResponse.data[0] : strapiResponse.data;
        const heroImages = data?.hero;

        if (heroImages && heroImages.length > 0) {
            return heroImages.map((image: StrapiImage) => getImageUrl([image], { width: 1200, height: 400, crop: 'fill' }));
        }

        return [];

    } catch (error) {
        console.error("An error occurred while fetching homepage hero images:", error);
        return [];
    }
}