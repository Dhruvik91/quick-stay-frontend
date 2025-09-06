import { CompanyLogo } from "@/assets/icons";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-auto",
  md: "h-8 w-auto",
  lg: "h-12 w-auto",
  xl: "h-16 w-auto",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export function Logo({ size = "md", showText = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <CompanyLogo
        className={cn(sizeClasses[size])}
        width="auto"
        height="auto"
      />
      {showText && (
        <span
          className={cn("font-semibold text-foreground", textSizeClasses[size])}
        >
          Quick Stay
        </span>
      )}
    </div>
  );
}
