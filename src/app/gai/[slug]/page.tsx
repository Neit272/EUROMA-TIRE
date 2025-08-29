import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { treadPatterns } from "@/lib/data";

const getPatternData = (slug: string) => {
  return treadPatterns.find((p) => p.id === slug);
};

export default function GaiDetailPage({ params }: { params: { slug: string } }) {
  const pattern = getPatternData(params.slug);

  if (!pattern) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Column */}
        <div>
          <Image
            src={pattern.imageUrl}
            alt={pattern.name}
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Details Column */}
        <div>
          <Badge variant={pattern.type === 'Đi Rừng' ? 'destructive' : 'secondary'}>
            {pattern.type}
          </Badge>
          <h1 className="text-4xl font-extrabold mt-2">{pattern.name}</h1>
          <p className="text-lg text-muted-foreground mt-4">{pattern.description}</p>
          <Button size="lg" className="mt-8 w-full md:w-auto">
            Yêu Cầu Báo Giá
          </Button>
        </div>
      </div>

      {/* Models Table */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Bảng Thông Số Kỹ Thuật</h2>
        <div className="border rounded-lg overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">MÃ SẢN PHẨM</TableHead>
                      <TableHead className="font-bold">LỐP BỐ</TableHead>
                      <TableHead className="font-bold">TRỌNG LƯỢNG</TableHead>
                      <TableHead className="font-bold">ĐƯỜNG KÍNH</TableHead>
                      <TableHead className="font-bold">RỘNG HÔNG</TableHead>
                      <TableHead className="font-bold">RỘNG LƯNG</TableHead>
                      <TableHead className="font-bold">SỐ GAI</TableHead>
                      <TableHead className="font-bold">SÂU GAI</TableHead>
                      <TableHead className="font-bold">BƠM HƠI</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pattern.models.map((model) => (
                    <TableRow key={model.sku}>
                        <TableCell>{model.sku}</TableCell>
                        <TableCell>{model.ply}</TableCell>
                        <TableCell>{model.weight}</TableCell>
                        <TableCell>{model.diameter}</TableCell>
                        <TableCell>{model.sectionWidth}</TableCell>
                        <TableCell>{model.treadWidth}</TableCell>
                        <TableCell>{model.treadCount}</TableCell>
                        <TableCell>{model.treadDepth}</TableCell>
                        <TableCell>{model.inflationPressure}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
}