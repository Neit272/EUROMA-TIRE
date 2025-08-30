'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: "/#products", label: "Sản phẩm" },
    { href: "/#categories", label: "Loại lốp" },
    { href: "/#contact", label: "Liên hệ" },
    { href: "/about", label: "Về chúng tôi" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link href="/">EUROMA TIRE</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 items-center">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-blue-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation (Collapsible) */}
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

