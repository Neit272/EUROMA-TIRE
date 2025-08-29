import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { treadPatterns } from "@/lib/data";

interface TreadPatternsSectionProps {
  showAll?: boolean;
}

export const TreadPatternsSection = ({ showAll = false }: TreadPatternsSectionProps) => {
  const patternsToShow = showAll ? treadPatterns : treadPatterns.slice(0, 6);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {patternsToShow.map((pattern) => (
            <Link href={`/gai/${pattern.id}`} key={pattern.id} className="block group">
              <Card className="flex flex-col overflow-hidden h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <div className="p-0">
                  <Image
                    src={pattern.imageUrl}
                    alt={pattern.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-auto"
                  />
                </div>
                <CardContent className="p-4 flex-grow">
                  <Badge variant={pattern.type === 'Đi Rừng' ? 'destructive' : 'secondary'}>
                    {pattern.type}
                  </Badge>
                  <h3 className="text-xl font-bold mt-2">{pattern.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {pattern.description}
                  </p>
                </CardContent>
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