'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
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
import { ChevronLeft, ChevronRight, ZoomIn, Expand } from 'lucide-react';

interface DisplayImage {
  largeUrl: string;
  thumbnailUrl: string;
  originalUrl: string;
}

interface ProductDetailViewProps {
  pattern: TreadPattern;
}

export function ProductDetailView({ pattern }: ProductDetailViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<TreadPatternModel | null>(null);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Touch/swipe states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Auto-play state
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (pattern.models && pattern.models.length > 0) {
      setSelectedModel(pattern.models[0]);
    }
  }, [pattern]);

  const displayImages: DisplayImage[] = useMemo(() => {
    return selectedModel?.images?.map((img: StrapiImage) => {
      const imageUrl = getImageUrl([img], { width: 600, height: 600, crop: 'fill' });
      
      // Get the large format URL and ensure it's converted to a web-friendly format
      let originalUrl = img.formats?.large?.url || img.url || imageUrl;
      
      // If it's a Cloudinary URL, force conversion to JPEG for browser compatibility
      if (originalUrl.includes('cloudinary.com') && originalUrl.includes('/upload/')) {
        // Add f_auto (auto format) or f_jpg to convert HEIC to JPEG
        originalUrl = originalUrl.replace('/upload/', '/upload/f_jpg,q_auto/');
      }
      
      return { 
        largeUrl: imageUrl,
        thumbnailUrl: imageUrl,
        originalUrl: originalUrl
      };
    }) || [];
  }, [selectedModel]);

  useEffect(() => {
    if (displayImages.length > 0) {
      setCurrentImageIndex(0);
      setActiveImageUrl(displayImages[0].largeUrl);
      setIsAutoPlaying(true); // Bắt đầu auto-play khi có ảnh
    } else {
      setActiveImageUrl('https://placehold.co/600x600/eee/fff?text=No+Image');
      setIsAutoPlaying(false);
    }
  }, [displayImages]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || displayImages.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, 5000); // 5 giây

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentImageIndex, displayImages.length]);

  // Function để chuyển đến ảnh cụ thể
  const goToImage = (index: number) => {
    if (index >= 0 && index < displayImages.length) {
      setCurrentImageIndex(index);
      setActiveImageUrl(displayImages[index].largeUrl);
      // Tạm dừng auto-play khi user tương tác
      setIsAutoPlaying(false);
      // Khởi động lại auto-play sau 10 giây
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  // Function để chuyển ảnh tiếp theo
  const nextImage = () => {
    if (displayImages.length === 0) return;
    const nextIndex = (currentImageIndex + 1) % displayImages.length;
    setCurrentImageIndex(nextIndex);
    setActiveImageUrl(displayImages[nextIndex].largeUrl);
  };

  // Function để chuyển ảnh trước
  const prevImage = () => {
    if (displayImages.length === 0) return;
    const prevIndex = currentImageIndex === 0 ? displayImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setActiveImageUrl(displayImages[prevIndex].largeUrl);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false); // Tạm dừng auto-play khi user touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && displayImages.length > 1) {
      nextImage();
    }
    if (isRightSwipe && displayImages.length > 1) {
      prevImage();
    }
    
    // Khởi động lại auto-play sau 10 giây
    setTimeout(() => setIsAutoPlaying(true), 10000);
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          {/* Main carousel container */}
          <div className="relative w-full aspect-square bg-gray-100 rounded-lg shadow-lg overflow-hidden">
            {displayImages.length > 0 ? (
              <>
                {/* Carousel images container */}
                <div 
                  className="relative w-full h-full select-none"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div 
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {displayImages.map((image, index) => (
                      <div 
                        key={index} 
                        className="w-full h-full flex-shrink-0 relative group cursor-pointer"
                        onClick={() => {
                          setLightboxIndex(index);
                          setLightboxOpen(true);
                        }}
                      >
                        <Image
                          src={image.largeUrl}
                          alt={`${pattern.name} - Ảnh ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index === 0}
                        />
                        {/* Zoom hint overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                          <div className="bg-white/90 rounded-full p-3 shadow-lg">
                            <Expand className="w-6 h-6 text-gray-700" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Auto-play indicator */}
                {displayImages.length > 1 && isAutoPlaying && (
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                    Auto
                  </div>
                )}

                {/* Swipe instruction - chỉ hiện trên mobile */}
                {displayImages.length > 1 && (
                  <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/70 text-xs md:hidden pointer-events-none">
                    ← Vuốt
                  </div>
                )}
                {displayImages.length > 1 && (
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/70 text-xs md:hidden pointer-events-none">
                    Vuốt →
                  </div>
                )}

                {/* Dots indicator - chỉ hiện khi có nhiều hơn 1 ảnh */}
                {displayImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {displayImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={cn(
                          "w-3 h-3 rounded-full transition-all duration-300 hover:scale-125",
                          currentImageIndex === index 
                            ? "bg-white shadow-lg scale-110" 
                            : "bg-white/60 hover:bg-white/80"
                        )}
                        aria-label={`Xem ảnh ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Chọn một mẫu mã để xem ảnh
              </div>
            )}
          </div>
          {/* Thumbnail navigation */}
          {displayImages.length > 0 && (
            <div className="flex justify-center gap-3 h-20">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    'relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-300',
                    currentImageIndex === index 
                      ? 'border-primary shadow-md scale-105' 
                      : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                  )}
                  aria-label={`Xem ảnh ${index + 1} của ${pattern.name}`}
                >
                  <Image
                    src={image.thumbnailUrl}
                    alt={`Thumbnail ${index + 1} for ${pattern.name}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
          
          {/* Instructions */}
          {displayImages.length > 0 && (
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p className="font-medium">Nhấp vào ảnh để xem ảnh gốc toàn màn hình</p>
              {displayImages.length > 1 && (
                <p>
                  <span className="md:hidden">Vuốt trái/phải để chuyển ảnh</span>
                  <span className="hidden md:inline">Click thumbnails để chuyển ảnh</span>
                </p>
              )}
            </div>
          )}
          
          {/* No images message */}
          {displayImages.length === 0 && (
            <div className="text-sm text-muted-foreground text-center">
              Mẫu mã này chưa có hình ảnh.
            </div>
          )}
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

      {/* Fullscreen Image Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={displayImages.map((img) => ({
          src: img.originalUrl,
          alt: pattern.name,
        }))}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
      />
    </div>
  );
}