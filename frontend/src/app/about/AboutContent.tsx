'use client';

import { type BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';

interface AboutContentProps {
  content: BlocksContent;
}

export function AboutContent({ content }: AboutContentProps) {
  if (!content) return null;

  return (
    <div className="max-w-none">
      <BlocksRenderer 
        content={content}
        blocks={{
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return <h1 className="text-4xl font-bold my-6">{children}</h1>;
              case 2:
                return <h2 className="text-3xl font-bold my-5">{children}</h2>;
              case 3:
                return <h3 className="text-2xl font-semibold my-4">{children}</h3>;
              case 4:
                return <h4 className="text-xl font-semibold my-3">{children}</h4>;
              default:
                return <h5 className="text-lg font-semibold my-2">{children}</h5>;
            }
          },
          paragraph: ({ children }) => <p className="mb-4 text-base leading-relaxed">{children}</p>,
          list: ({ children, format }) => {
            const Tag = format === 'ordered' ? 'ol' : 'ul';
            const listStyle = format === 'ordered' ? 'list-decimal' : 'list-disc';
            return <Tag className={`${listStyle} list-inside mb-4 pl-5 space-y-2`}>{children}</Tag>;
          },
          'list-item': ({ children }) => {
            return <li className="leading-relaxed">{children}</li>;
          }
        }}
      />
    </div>
  );
}
