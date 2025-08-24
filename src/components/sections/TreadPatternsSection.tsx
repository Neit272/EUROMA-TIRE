import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Mock data for tread patterns
const treadPatterns = [
  {
    id: "an-do-jk",
    name: "Ấn Độ - JK",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Ấn Độ - JK.",
    imageUrl: "https://placehold.co/400x400/222/fff?text=Ấn+Độ+-+JK",
  },
  {
    id: "ba-soc",
    name: "Ba Sọc",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Ba Sọc.",
    imageUrl: "https://placehold.co/400x400/333/fff?text=Ba+Sọc",
  },
  {
    id: "ba-soc-l",
    name: "Ba Sọc L",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Ba Sọc L.",
    imageUrl: "https://placehold.co/400x400/444/fff?text=Ba+Sọc+L",
  },
  {
    id: "ba-soc-n",
    name: "Ba Sọc N",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Ba Sọc N.",
    imageUrl: "https://placehold.co/400x400/555/fff?text=Ba+Sọc+N",
  },
  {
    id: "belarus",
    name: "BELARUS",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai BELARUS.",
    imageUrl: "https://placehold.co/400x400/666/fff?text=BELARUS",
  },
  {
    id: "gai-dao",
    name: "Gai Dão",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Gai Dão.",
    imageUrl: "https://placehold.co/400x400/777/fff?text=Gai+Dão",
  },
  {
    id: "gai-dao-s",
    name: "Gai Dão S",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Gai Dão S.",
    imageUrl: "https://placehold.co/400x400/888/fff?text=Gai+Dão+S",
  },
  {
    id: "gai-moc-7",
    name: "Gai Móc 7",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Gai Móc 7.",
    imageUrl: "https://placehold.co/400x400/999/fff?text=Gai+Móc+7",
  },
  {
    id: "gai-ngang",
    name: "Gai Ngang",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Gai Ngang.",
    imageUrl: "https://placehold.co/400x400/aaa/fff?text=Gai+Ngang",
  },
  {
    id: "gai-xoi",
    name: "Gai Xới",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Gai Xới.",
    imageUrl: "https://placehold.co/400x400/bbb/fff?text=Gai+Xới",
  },
  {
    id: "gai-xoi-l",
    name: "Gai Xới L",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Gai Xới L.",
    imageUrl: "https://placehold.co/400x400/ccc/fff?text=Gai+Xới+L",
  },
  {
    id: "gai-xoi-t",
    name: "Gai Xới T",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Gai Xới T.",
    imageUrl: "https://placehold.co/400x400/ddd/fff?text=Gai+Xới+T",
  },
  {
    id: "gai-xuoi",
    name: "Gai Xuôi",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Gai Xuôi.",
    imageUrl: "https://placehold.co/400x400/eee/fff?text=Gai+Xuôi",
  },
  {
    id: "hq-tiron",
    name: "HQ TIRON",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai HQ TIRON.",
    imageUrl: "https://placehold.co/400x600/111/fff?text=HQ+TIRON",
  },
  {
    id: "luc-si",
    name: "Lực Sĩ",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Lực Sĩ.",
    imageUrl: "https://placehold.co/400x400/222/fff?text=Lực+Sĩ",
  },
  {
    id: "moc-7",
    name: "Móc 7",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai Móc 7.",
    imageUrl: "https://placehold.co/400x400/333/fff?text=Móc+7",
  },
  {
    id: "pelttlas",
    name: "PELTTLAS",
    type: "Chưa phân loại",
    description: "Mô tả chi tiết cho loại gai PELTTLAS.",
    imageUrl: "https://placehold.co/400x400/444/fff?text=PELTTLAS",
  },
];

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