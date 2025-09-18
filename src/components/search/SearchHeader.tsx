interface SearchHeaderProps {
  title?: string;
  subtitle?: string;
  badgeText?: {
    desktop: string;
    mobile: string;
  };
}

export function SearchHeader({
  title = "Find Your Perfect Stay",
  subtitle = "Discover PG accommodations, rentals, hostels, and co-living spaces tailored to your needs with our advanced search and filtering system",
  badgeText = {
    desktop: "Live Search with Real-time Results",
    mobile: "Live Search",
  },
}: SearchHeaderProps) {
  return (
    <header className="text-center my-6 sm:my-8 md:my-12">
      <div className="mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/20 text-white text-xs sm:text-sm font-medium mb-3 sm:mb-4">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="hidden sm:inline">{badgeText.desktop}</span>
          <span className="sm:hidden">{badgeText.mobile}</span>
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white to-primary/60 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
        {title}
      </h1>
      <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2">
        {subtitle}
      </p>
    </header>
  );
}
