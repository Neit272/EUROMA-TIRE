const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground p-8 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center text-center md:text-left">
        
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} Công ty TNHH Cơ Khí Tín Đạt.</p>
          <p className="text-sm text-gray-400">All rights reserved.</p>
        </div>

        <div className="flex flex-col items-center md:items-end text-sm">
          <p>Địa chỉ: Ấp Thuận Hòa 2, xã Hòa Khánh Nam, Đức Hòa, Long An</p>
          <p>Email: ctyvoruotxetindat@gmail.com</p>
          <p>Điện thoại: 0839911148</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
