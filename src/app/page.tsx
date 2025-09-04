import { SearchContainer } from "@/components/search/SearchContainer";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SearchContainer />
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
