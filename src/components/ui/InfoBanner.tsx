import { Mail } from "lucide-react";

export const InfoBanner = () => {
  return (
    <div className="bg-primary/10 border-b border-primary/20 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Mail className="h-8 w-8 text-primary" />
          <span>
            Property owners who wish to list their properties can reach us at{" "}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
              className="text-primary hover:text-primary/80 underline transition-colors cursor-pointer"
            >
              support@quickstay.com
            </a>
            .
          </span>
        </div>
      </div>
    </div>
  );
};
