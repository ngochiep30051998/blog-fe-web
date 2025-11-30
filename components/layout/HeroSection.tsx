import { CategoryTag } from "@/components/ui/CategoryTag";
import { Heading } from "@/components/ui/Heading";
import { Subheading } from "@/components/ui/Subheading";
import { SearchBar } from "@/components/ui/SearchBar";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background gradient - full width */}
      <div className="absolute inset-0 w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Decorative animated blobs - full width */}
      <div className="absolute inset-0 w-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <CategoryTag text="Our blog" variant="primary" />
          
          <Heading level="h1" className="text-center">
            Resources and insights
          </Heading>
          
          <Subheading className="text-center">
            The latest industry news, interviews, technologies, and resources.
          </Subheading>
          
          <div className="pt-4 w-full max-w-md">
            <SearchBar placeholder="Search" onSearch={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
}
