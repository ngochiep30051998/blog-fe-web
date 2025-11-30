import { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import { Heading } from "@/components/ui/Heading";
import { CategoryTag } from "@/components/ui/CategoryTag";

async function fetchCategories() {
  try {
    const response = await getCategories({ page: 1, page_size: 100 });
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await fetchCategories();

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
          <Heading level="h1">All Categories</Heading>
          <p className="text-gray-600 mt-2">
            Browse posts by category
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const slugValue = typeof category.slug === "object" ? category.slug.value : category.slug;
              return (
                <Link
                  key={category._id}
                  href={`/categories/${category._id}`}
                  className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200"
                >
                  <CategoryTag text={category.name} variant="primary" className="mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  {category.children && category.children.length > 0 && (
                    <p className="text-sm text-gray-500 mt-4">
                      {category.children.length} subcategories
                    </p>
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
  title: "Categories - Blog",
  description: "Browse all blog categories",
};
