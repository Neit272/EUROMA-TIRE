import { Button } from "@/components/ui/button";
import Link from "next/link";

import { HeroCarousel } from "./HeroCarousel";

export function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          EUROMA TIRE - VỮNG BƯỚC THÀNH CÔNG
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
          Nhà phân phối lốp xe tải, xe nông nghiệp và công nghiệp hàng đầu. Chúng tôi cam kết mang đến sản phẩm chất lượng, độ bền cao và dịch vụ khách hàng vượt trội.
        </p>
      </div>
      <div className="mt-8 md:mt-12">
        <HeroCarousel />
      </div>
    </section>
  );
}

