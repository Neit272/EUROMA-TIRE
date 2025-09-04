import { ContactForm } from "./ContactForm";

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
            <div className="w-full h-96 bg-gray-200 mt-4 rounded-md overflow-hidden">
              <iframe
                title="Bản đồ vị trí công ty"
                src="https://maps.google.com/maps?q=Đường%2049%2C%20Tân%20Tạo%2C%20Bình%20Tân&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
