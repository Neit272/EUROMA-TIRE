'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchResult {
  productId: string;
  productName: string;
  productSlug: string;
  sku: string;
  size: string;
  thumbnail?: string;
}

interface SearchBarProps {
  isMobile?: boolean;
  onResultClick?: () => void;
}

export function SearchBar({ isMobile = false, onResultClick }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(isMobile);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? process.env.NEXT_PUBLIC_STRAPI_API_URL
          : process.env.NEXT_PUBLIC_STRAPI_API_URL;
          
        const response = await fetch(
          `${apiUrl}/api/san-phams?populate[models][fields][0]=sku&populate[models][fields][1]=diameter&populate[models][fields][2]=sectionWidth&populate[thumbnail][fields][0]=url&populate[thumbnail][fields][1]=formats&fields[0]=name&fields[1]=slug&fields[2]=id`
        );
        const data = await response.json();

        const searchResults: SearchResult[] = [];
        const lowerQuery = query.toLowerCase();
        let count = 0;
        const maxResults = 10;

        for (const product of data.data) {
          if (count >= maxResults) break;

          const nameMatch = product.name.toLowerCase().includes(lowerQuery);

          if (product.models && Array.isArray(product.models)) {
            for (const model of product.models) {
              if (count >= maxResults) break;

              const skuMatch = model.sku?.toLowerCase().includes(lowerQuery);
              const sizeMatch = 
                model.diameter?.toLowerCase().includes(lowerQuery) ||
                model.sectionWidth?.toLowerCase().includes(lowerQuery);

              if (nameMatch || skuMatch || sizeMatch) {
                searchResults.push({
                  productId: product.id,
                  productName: product.name,
                  productSlug: product.slug,
                  sku: model.sku,
                  size: `${model.sectionWidth || ''} ${model.diameter || ''}`.trim(),
                  thumbnail: product.thumbnail?.formats?.thumbnail?.url || product.thumbnail?.url,
                });
                count++;
              }
            }
          } else if (nameMatch && count < maxResults) {
            searchResults.push({
              productId: product.id,
              productName: product.name,
              productSlug: product.slug,
              sku: '',
              size: '',
              thumbnail: product.thumbnail?.formats?.thumbnail?.url || product.thumbnail?.url,
            });
            count++;
          }
        }

        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 150);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleResultClick = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
    setQuery('');
    onResultClick?.();
  };

  if (isMobile) {
    return (
      <div ref={searchRef} className="w-full">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm tên hoặc kích thước..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {query.trim().length >= 2 && (
          <div className="max-h-64 overflow-y-auto">
            {isLoading && (
              <div className="p-4 text-center text-sm text-gray-500">
                Đang tìm kiếm...
              </div>
            )}

            {!isLoading && results.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                Không tìm thấy kết quả
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="divide-y border-t">
                {results.map((result, index) => {
                  let url = `/gai/${result.productSlug}`;
                  if (result.sku) {
                    const params = new URLSearchParams();
                    params.set('sku', result.sku);
                    url = `${url}?${params.toString()}`;
                  }
                  
                  return (
                    <Link
                      key={`${result.productId}-${result.sku}-${index}`}
                      href={url}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                    >
                      {result.thumbnail && (
                        <div className="relative w-10 h-10 flex-shrink-0 bg-gray-100 rounded">
                          <Image
                            src={result.thumbnail}
                            alt={result.productName}
                            fill
                            className="object-cover rounded"
                            sizes="40px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{result.productName}</p>
                        {result.sku && (
                          <p className="text-xs text-gray-500">
                            <span className="font-mono">{result.sku}</span>
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[90vw] md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm tên hoặc kích thước..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading && (
              <div className="p-4 text-center text-sm text-gray-500">
                Đang tìm kiếm...
              </div>
            )}

            {!isLoading && query.trim().length >= 2 && results.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                Không tìm thấy kết quả
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="divide-y">
                {results.map((result, index) => {
                  let url = `/gai/${result.productSlug}`;
                  if (result.sku) {
                    const params = new URLSearchParams();
                    params.set('sku', result.sku);
                    url = `${url}?${params.toString()}`;
                  }
                  
                  return (
                    <Link
                      key={`${result.productId}-${result.sku}-${index}`}
                      href={url}
                      onClick={handleResultClick}
                      className="w-full p-3 hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                    >
                      {result.thumbnail && (
                        <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded">
                          <Image
                            src={result.thumbnail}
                            alt={result.productName}
                            fill
                            className="object-cover rounded"
                            sizes="48px"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{result.productName}</p>
                        {result.sku && (
                          <p className="text-xs text-gray-500">
                            <span className="font-mono">{result.sku}</span>
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
