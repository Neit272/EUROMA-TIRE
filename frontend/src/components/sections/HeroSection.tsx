import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Giải Pháp Lốp Xe Toàn Diện
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          EUROMA TIRE chuyên cung cấp lốp xe tải, xe máy cày chính hãng với chất lượng hàng đầu, đảm bảo an toàn và hiệu suất cho mọi hành trình.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="transition-transform hover:scale-105">
            <Link href="/#products">Xem Sản Phẩm</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="transition-transform hover:scale-105">
            <Link href="/#contact">Liên Hệ Tư Vấn</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
