"use client";

import { useState, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  placeholder = "Search...",
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && value.trim()) {
        onSearch(value.trim());
      }
      if (e.key === "Escape") {
        onClear();
        inputRef.current?.blur();
      }
    },
    [value, onSearch, onClear]
  );

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  const handleSearchClick = () => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative flex items-center glass-card rounded-2xl transition-all duration-300 max-sm:max-w-[350px]",
          "p-3 sm:p-4 md:p-6",
          isFocused && "ring-2 ring-primary/50 glow-effect",
          "hover:bg-surface/90"
        )}
      >
        <Search
          className={cn(
            "h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 transition-colors duration-200 flex-shrink-0",
            isFocused ? "text-primary" : "text-text-secondary"
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
            "flex-1 bg-transparent text-base sm:text-lg text-text-primary placeholder-text-secondary",
            "border-none outline-none focus:ring-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "min-w-0" // Prevents input from overflowing
          )}
          aria-label="Search accommodations"
          aria-describedby="search-instructions"
        />

        {/* Action buttons container */}
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          {/* Clear button */}
          {value && !isLoading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className={cn(
                "h-8 w-8 p-0 rounded-full transition-colors duration-200",
                "text-text-secondary hover:text-text-primary hover:bg-border/50",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "touch-manipulation" // Improves touch responsiveness
              )}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="h-8 w-8 flex items-center justify-center">
              <Loader2
                className="h-4 w-4 text-primary animate-spin"
                aria-hidden="true"
              />
            </div>
          )}

          {/* Search button - visible on mobile and when there's text */}
          {value.trim() && !isLoading && (
            <Button
              onClick={handleSearchClick}
              size="sm"
              className={cn(
                "h-8 px-3 sm:px-4 rounded-full transition-all duration-200",
                "bg-primary hover:bg-primary/90 text-primary-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "touch-manipulation font-medium text-sm",
                "shadow-sm hover:shadow-md"
              )}
              aria-label="Search"
            >
              <Search className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          )}
        </div>
      </div>

      <div
        id="search-instructions"
        className="sr-only"
        role="status"
        aria-live="polite"
      >
        {isLoading
          ? "Searching accommodations..."
          : "Type to search for accommodations"}
      </div>
    </div>
  );
}
