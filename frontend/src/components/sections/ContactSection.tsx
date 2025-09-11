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
              <strong>Địa chỉ:</strong> Ấp Thuận Hòa 2, xã Hòa Khánh Nam, Đức Hòa, Long An
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Email:</strong> ctyvoruotxetindat@gmail.com
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Điện thoại:</strong> 0839911148
            </p>
            <div className="w-full h-96 bg-gray-200 mt-4 rounded-md overflow-hidden">
              <iframe
                title="Bản đồ vị trí công ty"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.482486697055!2d106.40924747591076!3d10.850859789302428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310ad6f6e67b4923%3A0x222f2b570a6a0f9a!2zQ8O0bmcgVHkgVE5ISCBN4buZdCBUaMOgbmggVmnDqm4gU-G6o24gWHXhuqV0IFRoxrDGoW5nIE3huqFpIEPGoSBLaMOtIFTDrW4gxJDhuqF0!5e0!3m2!1sen!2s!4v1757559047624!5m2!1sen!2s"
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