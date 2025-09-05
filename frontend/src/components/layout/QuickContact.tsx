
'use client';

import { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 6h12l-12 12h12" />
  </svg>
);

const MessengerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.438 0 4.72-.73 6.63-2.018a1.001 1.001 0 00.37-.882v-3.08a1 1 0 00-.52-.882l-2.68-1.48a1 1 0 00-1.1.122l-1.86 1.55a1 1 0 01-1.28 0l-2.92-2.43a1 1 0 010-1.4l3.6-3a1 1 0 00.12-1.1L12.5 4.52a1 1 0 00-1.38-.38l-2.6 1.5a1 1 0 01-1.28 0L4.5 4.52a1 1 0 00-1.38.38L2 7.1a1 1 0 00.12 1.1l3.6 3a1 1 0 010 1.4l-2.92 2.43a1 1 0 01-1.28 0l-1.86-1.55a1 1 0 00-1.1-.122l-2.68 1.48a1 1 0 00-.52-.882v3.08a1.001 1.001 0 00.37.882C7.28 23.27 9.562 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

export function QuickContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: 'Call',
      href: 'tel:0987654321', // Placeholder
      icon: Phone,
      bgColor: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'Zalo',
      href: 'https://zalo.me/0987654321', // Placeholder
      icon: ZaloIcon,
      bgColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      name: 'Messenger',
      href: 'https://m.me/your-facebook-page-id', // Placeholder
      icon: MessengerIcon,
      bgColor: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-4">
      <div
        className={cn(
          'flex flex-col items-center gap-4 transition-all duration-300 ease-in-out',
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {contacts.map((contact) => (
          <a
            key={contact.name}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-110',
              contact.bgColor
            )}
            aria-label={contact.name}
          >
            <contact.icon className="h-6 w-6" />
          </a>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        aria-label="Toggle contact menu"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
      </button>
    </div>
  );
}
