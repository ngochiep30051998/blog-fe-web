import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getCategoryById, getPostsByCategory } from "@/lib/api";
import { formatPostResponse } from "@/lib/utils";
import { Heading } from "@/components/ui/Heading";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { BlogGrid } from "@/components/blog/BlogGrid";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function fetchCategory(id: string) {
  try {
    const response = await getCategoryById(id);
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

async function fetchPosts(categoryId: string, page: number = 1) {
  try {
    const response = await getPostsByCategory({
      category_id: categoryId,
      page,
      page_size: 12,
    });
    if (response.success && response.data) {
      return {
        posts: response.data.map(formatPostResponse),
        total: response.total || 0,
        page: response.page || 1,
        pageSize: response.page_size || 12,
      };
    }
    return { posts: [], total: 0, page: 1, pageSize: 12 };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], total: 0, page: 1, pageSize: 12 };
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { id } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  const category = await fetchCategory(id);
  if (!category) {
    notFound();
  }

  const { posts, total, pageSize } = await fetchPosts(id, currentPage);
  const totalPages = Math.ceil(total / pageSize);

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
          <Link
            href="/categories"
            className="text-primary-600 hover:text-primary-700 mb-4 inline-block ml-4"
          >
            ← All Categories
          </Link>

          <div className="mt-4">
            <CategoryTag text={category.name} variant="primary" className="mb-4" />
            <Heading level="h1">{category.name}</Heading>
            {category.description && (
              <p className="text-gray-600 mt-2 max-w-3xl">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Subcategories */}
        {category.children && category.children.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Subcategories
            </h2>
            <div className="flex flex-wrap gap-2">
              {category.children.map((child) => (
                <Link
                  key={child._id}
                  href={`/categories/${child._id}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Posts ({total})
          </h2>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts found in this category.</p>
          ) : (
            <BlogGrid posts={posts} />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {currentPage > 1 && (
              <Link
                href={`/categories/${id}?page=${currentPage - 1}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
              >
                Previous
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                href={`/categories/${id}?page=${currentPage + 1}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = await fetchCategory(id);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - Categories`,
    description: category.description || `Posts in ${category.name} category`,
  };
}
