import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getProductsFromStrapi } from "@/lib/strapi";

interface TreadPatternsSectionProps {
  showAll?: boolean;
}

export const TreadPatternsSection = async ({ showAll = false }: TreadPatternsSectionProps) => {
  const allProducts = await getProductsFromStrapi();
  const patternsToShow = showAll ? allProducts : allProducts.slice(0, 6);

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {showAll ? "Tất Cả Các Loại Gai Lốp" : "Các Loại Gai Lốp Phổ Biến"}
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            {showAll
              ? "Khám phá toàn bộ các loại gai lốp chất lượng cao của chúng tôi."
              : "Lựa chọn loại gai phù hợp với nhu cầu công việc của bạn."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patternsToShow.map((pattern) => (
            <Link href={`/gai/${pattern.id}`} key={pattern.id} className="block">
              <Card className="group overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative overflow-hidden">
                  <Image
                    src={pattern.imageUrl}
                    alt={pattern.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out max-md:hidden">
                    <Button>Xem Chi Tiết</Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Badge variant={pattern.type === 'Đi Rừng' ? 'destructive' : 'secondary'}>
                    {pattern.type}
                  </Badge>
                  <h3 className="text-xl font-bold mt-2">{pattern.name}</h3>
                </CardContent>
                <div className="px-4 pb-4 md:hidden">
                  <Button className="w-full" variant="outline">Xem Chi Tiết</Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {!showAll && (
          <div className="text-center mt-12">
            <Link href="/gai">
              <Button size="lg">Xem Tất Cả Sản Phẩm</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};