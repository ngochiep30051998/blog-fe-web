import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getTagBySlug, getPostsByTag } from "@/lib/api";
import { formatPostResponse } from "@/lib/utils";
import { Heading } from "@/components/ui/Heading";
import { BlogGrid } from "@/components/blog/BlogGrid";

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function fetchTag(slug: string) {
  try {
    const response = await getTagBySlug(slug);
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching tag:", error);
    return null;
  }
}

async function fetchPosts(tagSlug: string, page: number = 1) {
  try {
    const response = await getPostsByTag({
      tag_slug: tagSlug,
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

export default async function TagPage({
  params,
  searchParams,
}: TagPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  const tag = await fetchTag(slug);
  if (!tag) {
    notFound();
  }

  const { posts, total, pageSize } = await fetchPosts(slug, currentPage);
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
            href="/tags"
            className="text-primary-600 hover:text-primary-700 mb-4 inline-block ml-4"
          >
            ← All Tags
          </Link>

          <div className="mt-4">
            <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 mb-4">
              {tag.name}
            </span>
            <Heading level="h1">Posts tagged: {tag.name}</Heading>
            {tag.description && (
              <p className="text-gray-600 mt-2 max-w-3xl">
                {tag.description}
              </p>
            )}
            {tag.usage_count !== undefined && (
              <p className="text-sm text-gray-500 mt-2">
                Used in {tag.usage_count} post{tag.usage_count !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="mb-8">
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts found with this tag.</p>
          ) : (
            <BlogGrid posts={posts} />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {currentPage > 1 && (
              <Link
                href={`/tags/${slug}?page=${currentPage - 1}`}
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
                href={`/tags/${slug}?page=${currentPage + 1}`}
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

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = await fetchTag(slug);

  if (!tag) {
    return {
      title: "Tag Not Found",
    };
  }

  return {
    title: `${tag.name} - Tags`,
    description: tag.description || `Posts tagged with ${tag.name}`,
  };
}
