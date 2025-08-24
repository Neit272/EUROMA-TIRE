import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link href="/">EUROMA TIRE</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/#products" className="hover:text-blue-600">Sản phẩm</Link></li>
            <li><Link href="/#categories" className="hover:text-blue-600">Loại lốp</Link></li>
            <li><Link href="/#contact" className="hover:text-blue-600">Liên hệ</Link></li>
            <li><Link href="/about" className="hover:text-blue-600">Về chúng tôi</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
