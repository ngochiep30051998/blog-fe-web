import { Suspense } from "react";
import Link from "next/link";
import { getTags } from "@/lib/api";
import { Heading } from "@/components/ui/Heading";

async function fetchTags() {
  try {
    const response = await getTags({ page: 1, page_size: 100 });
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export default async function TagsPage() {
  const tags = await fetchTags();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <Heading level="h1">All Tags</Heading>
          <p className="text-gray-600 mt-2">
            Browse posts by tags
          </p>
        </div>

        {tags.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tags found.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => {
              const slugValue = typeof tag.slug === "object" ? tag.slug.value : tag.slug;
              return (
                <Link
                  key={tag._id}
                  href={`/tags/${slugValue}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {tag.name}
                  {tag.usage_count !== undefined && tag.usage_count > 0 && (
                    <span className="ml-2 text-gray-500">
                      ({tag.usage_count})
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Tags - Blog",
  description: "Browse all blog tags",
};
