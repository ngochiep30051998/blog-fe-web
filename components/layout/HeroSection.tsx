import { CategoryTag } from "@/components/ui/CategoryTag";
import { Heading } from "@/components/ui/Heading";
import { Subheading } from "@/components/ui/Subheading";
import { SearchBar } from "@/components/ui/SearchBar";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
