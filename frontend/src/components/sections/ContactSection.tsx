import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Gửi thông tin cho chúng tôi nếu bạn cần tư vấn hoặc có bất kỳ câu hỏi nào.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Thông tin công ty</h3>
            <p className="text-muted-foreground mb-2">
              <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP. HCM
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Email:</strong> info@euromatire.com
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Điện thoại:</strong> 0123 456 789
            </p>
            {/* Placeholder for a map */}
            <div className="w-full h-64 bg-gray-200 mt-4 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Bản đồ sẽ được hiển thị ở đây</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 flex flex-col">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và Tên</Label>
              <Input id="name" placeholder="Nhập tên của bạn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" placeholder="Nhập số điện thoại" />
            </div>
            <div className="space-y-2 flex flex-col flex-grow">
              <Label htmlFor="message">Nội dung tin nhắn</Label>
              <Textarea id="message" placeholder="Bạn cần tư vấn về sản phẩm nào?" className="flex-grow" />
            </div>
            <Button type="submit" size="lg" className="w-full">Gửi Tin Nhắn</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
