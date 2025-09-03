const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center text-center md:text-left">
        
        {/* Copyright Info */}
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} Công ty TNHH Cơ Khí Tín Đạt.</p>
          <p className="text-sm text-gray-400">All rights reserved.</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-end text-sm">
          <p>Địa chỉ: 123 Đường ABC, Quận 1, TP. HCM</p>
          <p>Email: info@euromatire.com</p>
          <p>Điện thoại: 0123 456 789</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
