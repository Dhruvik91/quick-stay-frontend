'use client';

import { useState, useRef, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  onClear,
  isLoading,
  placeholder = 'Search...'
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onSearch(value.trim());
    }
    if (e.key === 'Escape') {
      onClear();
      inputRef.current?.blur();
    }
  }, [value, onSearch, onClear]);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div
        className={cn(
          'relative flex items-center glass-card rounded-2xl p-6 transition-all duration-300',
          isFocused && 'ring-2 ring-primary/50 glow-effect',
          'hover:bg-surface/90'
        )}
      >
        <Search 
          className={cn(
            'h-6 w-6 mr-4 transition-colors duration-200',
            isFocused ? 'text-primary' : 'text-text-secondary'
          )}
          aria-hidden="true"
        />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={isLoading}
          className={cn(
            'flex-1 bg-transparent text-lg text-text-primary placeholder-text-secondary',
            'border-none outline-none focus:ring-0',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Search accommodations"
          aria-describedby="search-instructions"
        />

        {isLoading && (
          <Loader2 
            className="h-6 w-6 ml-4 text-primary animate-spin" 
            aria-hidden="true"
          />
        )}

        {value && !isLoading && (
          <button
            onClick={handleClear}
            className={cn(
              ' p-1 rounded-full transition-colors duration-200',
              'text-text-secondary hover:text-text-primary hover:bg-border/50',
              'focus:outline-none focus:ring-2 focus:ring-primary/50'
            )}
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div 
        id="search-instructions" 
        className="sr-only"
        role="status"
        aria-live="polite"
      >
        {isLoading ? 'Searching accommodations...' : 'Type to search for accommodations'}
      </div>
    </div>
  );
}