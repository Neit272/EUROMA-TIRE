'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';

const multiSelectVariants = cva(
  'm-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300',
  {
    variants: {
      variant: {
        default:
          'border-foreground/10 text-foreground bg-card hover:bg-card/80',
        secondary:
          'border-secondary/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface MultiSelectProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onValueChange: (value: string[]) => void;
  value: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  asChild?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      value = [],
      placeholder = 'Select options',
      animation = 0,
      className,
    },
    _ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      }
    };

    const toggleOption = (selectedValue: string) => {
      const newSelectedValues = value.includes(selectedValue)
        ? value.filter((v) => v !== selectedValue)
        : [...value, selectedValue];
      onValueChange(newSelectedValues);
    };

    const handleAnimate = () => {
      if (animation > 0) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, animation);
      }
    };

    return (
      <CommandPrimitive onKeyDown={handleInputKeyDown} className='overflow-visible bg-transparent'>
        <div
          className={cn(
            'group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {value.map((selectedValue) => {
              const option = options.find((o) => o.value === selectedValue);
              const IconComponent = option?.icon;
              return (
                <Badge
                  key={selectedValue}
                  className={cn(multiSelectVariants({ variant }))}
                  style={{ animation: isAnimating ? `bounce ${animation}ms ease-in-out` : 'none' }}
                >
                  {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                  {option?.label}
                  <button
                    type="button"
                    aria-label={`Remove ${option?.label}`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleOption(selectedValue);
                    }}
                    className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
            <CommandPrimitive.Input
              placeholder={placeholder}
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              onFocus={() => setIsPopoverOpen(true)}
              onBlur={() => setTimeout(() => setIsPopoverOpen(false), 150)}
            />
          </div>
        </div>
        <div className="relative mt-2">
          {isPopoverOpen && (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup 
                className="h-full overflow-auto"
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              >
                {options.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        toggleOption(option.value);
                        handleAnimate();
                      }}
                      style={{ pointerEvents: 'auto', opacity: 1 }}
                      className='cursor-pointer'
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          )}
        </div>
      </CommandPrimitive>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
playName = 'MultiSelect';
