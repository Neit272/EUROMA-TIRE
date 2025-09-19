'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
    { href: "/gai", label: "Sản phẩm" },
    { href: "/#categories", label: "Loại lốp" },
    { href: "/#contact", label: "Liên hệ" },
    { href: "/about", label: "Về chúng tôi" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-contain bg-repeat-x z-[-1]"
        style={{ backgroundImage: "url(/assets/grass-bg.jpg)" }}
      ></div>
      <div className="absolute bottom-0 left-0 w-full h-16 z-[-1] overflow-x-hidden">
        <div className="animate-tractor absolute bottom-8" style={{ width: '60px' }}>
            <Image src="/assets/tractor.png" alt="Tractor" width={80} height={80} />
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center p-4 relative z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="Euroma Logo"
              width={40}
              height={40}
              className="rounded-full filter-shadow-white"
            />
            <span className="text-xl font-bold tracking-wider text-shadow-white-wide">EUROMA</span>
          </Link>
        </div>

        <nav className="hidden md:flex">
          <ul className="flex space-x-6 items-center">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-semibold hover:text-blue-600 text-shadow-white-wide">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:hidden">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="relative">
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="icon">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="absolute top-full right-0 mt-2 w-screen max-w-xs bg-white shadow-lg rounded-md border">
              <div className="flex flex-col p-2 gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium hover:bg-gray-100 rounded-md p-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </header>
  );
};

export default Header;

