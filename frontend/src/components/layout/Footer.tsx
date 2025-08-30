const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-16">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Công ty TNHH Cơ Khí Tín Đạt. All rights reserved.</p>
        <p className="mt-2">Địa chỉ: 123 Đường ABC, Quận 1, TP. HCM</p>
        <p>Email: info@euromatire.com | Điện thoại: 0123 456 789</p>
      </div>
    </footer>
  );
};

export default Footer;
