"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { SearchFilters } from "@/hooks/useSearch";
import { Filter, X, ChevronDown } from "lucide-react";

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const accommodationTypes = [
    { value: "PG", label: "PG" },
    { value: "Rental", label: "Rental" },
    { value: "Hostel", label: "Hostel" },
    { value: "Co-living", label: "Co-living" },
  ];

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined
  );

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ type: type as SearchFilters["type"] });
    } else {
      onFiltersChange({ type: undefined });
    }
  };

  const handleVerifiedChange = (checked: boolean) => {
    onFiltersChange({ verified: checked });
  };

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const clearAllFilters = () => {
    onClearFilters();
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1">
                {
                  Object.keys(filters).filter(
                    (key) => filters[key as keyof SearchFilters] !== undefined
                  ).length
                }
              </Badge>
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>

            <Separator />

            {/* Accommodation Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Accommodation Type</Label>
              <div className="space-y-2">
                {accommodationTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.value}
                      checked={filters.type === type.value}
                      onCheckedChange={(checked) =>
                        handleTypeChange(type.value, checked as boolean)
                      }
                    />
                    <Label htmlFor={type.value} className="text-sm">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Verified Only */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={filters.verified || false}
                  onCheckedChange={handleVerifiedChange}
                />
                <Label htmlFor="verified" className="text-sm">
                  Verified accommodations only
                </Label>
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Price Range (₹{filters.minPrice || 0} - ₹
                {filters.maxPrice || 50000})
              </Label>
              <Slider
                value={[filters.minPrice || 0, filters.maxPrice || 50000]}
                onValueChange={handlePriceRangeChange}
                max={50000}
                min={0}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹0</span>
                <span>₹50,000</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          {filters.type && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Type: {filters.type}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFiltersChange({ type: undefined })}
              />
            </Badge>
          )}
          {filters.verified && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Verified Only
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFiltersChange({ verified: false })}
              />
            </Badge>
          )}
          {(filters.minPrice || filters.maxPrice) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              ₹{filters.minPrice || 0} - ₹{filters.maxPrice || 50000}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  onFiltersChange({ minPrice: undefined, maxPrice: undefined })
                }
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
