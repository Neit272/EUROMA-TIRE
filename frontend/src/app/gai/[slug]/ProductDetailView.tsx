'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { ContactForm } from '@/components/sections/ContactForm';
import { TreadPattern, TreadPatternModel, StrapiImage } from '@/lib/data';
import { getImageUrl } from '@/lib/strapi';
import { cn } from '@/lib/utils';

interface DisplayImage {
  largeUrl: string;
  thumbnailUrl: string;
}

interface ProductDetailViewProps {
  pattern: TreadPattern;
}

export function ProductDetailView({ pattern }: ProductDetailViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<TreadPatternModel | null>(null);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (pattern.models && pattern.models.length > 0) {
      setSelectedModel(pattern.models[0]);
    }
  }, [pattern]);

  const displayImages: DisplayImage[] = useMemo(() => {
    return selectedModel?.images?.map((img: StrapiImage) => {
      const imageUrl = getImageUrl([img], { width: 600, height: 600, crop: 'fill' });
      return { 
        largeUrl: imageUrl,
        thumbnailUrl: imageUrl
      };
    }) || [];
  }, [selectedModel]);

  useEffect(() => {
    if (displayImages.length > 0) {
      setActiveImageUrl(displayImages[0].largeUrl);
    } else {
      setActiveImageUrl('https://placehold.co/600x600/eee/fff?text=No+Image');
    }
  }, [displayImages]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-gray-100 rounded-lg shadow-lg overflow-hidden">
            {activeImageUrl ? (
              <Image
                src={activeImageUrl}
                alt={`${pattern.name} - ${selectedModel?.sku || ''}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">Chọn một mẫu mã để xem ảnh</div>
            )}
          </div>
          <div className="flex justify-center gap-3 h-20">
            {displayImages.length > 0 ? displayImages.map((image) => (
              <button
                key={image.thumbnailUrl}
                onClick={() => setActiveImageUrl(image.largeUrl)}
                className={cn(
                  'relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all',
                  activeImageUrl === image.largeUrl ? 'border-primary shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                )}
              >
                <Image
                  src={image.thumbnailUrl}
                  alt={`Thumbnail for ${pattern.name}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            )) : <div className="text-sm text-muted-foreground self-center">Mẫu mã này chưa có hình ảnh.</div>}
          </div>
        </div>

        <div>
          <Badge variant={pattern.type === 'Đi Rừng' ? 'destructive' : 'secondary'}>
            {pattern.type}
          </Badge>
          <h1 className="text-4xl font-extrabold mt-2">{pattern.name}</h1>
          <p className="text-lg text-muted-foreground mt-4">{pattern.description}</p>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="mt-8 w-full md:w-auto">
                Yêu Cầu Báo Giá
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Yêu cầu báo giá: {pattern.name}</DialogTitle>
                <DialogDescription>
                  Vui lòng điền thông tin bên dưới. Chúng tôi sẽ liên hệ với bạn sớm nhất.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <ContactForm 
                  productName={pattern.name} 
                  models={pattern.models} 
                  onSuccess={() => setIsModalOpen(false)} 
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-2">Bảng Thông Số Kỹ Thuật</h2>
        <p className="text-center text-sm text-muted-foreground mb-4">Nhấp vào một dòng để xem hình ảnh chi tiết của từng mẫu mã.</p>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">MÃ SẢN PHẨM</TableHead>
                <TableHead className="font-bold">LỐP BỐ</TableHead>
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
                <TableRow 
                  key={model.sku}
                  onClick={() => setSelectedModel(model)}
                  className={cn(
                    'cursor-pointer transition-colors',
                    selectedModel?.sku === model.sku && 'bg-accent'
                  )}
                >
                  <TableCell>{model.sku}</TableCell>
                  <TableCell>{model.ply}</TableCell>
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
