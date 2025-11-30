import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getPostBySlug } from "@/lib/api";
import { formatDate, formatPostResponse } from "@/lib/utils";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { Heading } from "@/components/ui/Heading";
import { AuthorInfo } from "@/components/ui/AuthorInfo";
import { SafeImage } from "@/components/ui/SafeImage";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPost(slug: string) {
  try {
    const response = await getPostBySlug(slug);
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  const formattedPost = formatPostResponse(post);
  const slugValue = typeof post.slug === "object" ? post.slug.value : post.slug;
  const imageUrl = post.banner || post.thumbnail || null;

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          
          <div className="mb-4">
            <CategoryTag
              text={formattedPost.category}
              variant="secondary"
            />
          </div>
          
          <Heading level="h1" className="mb-4">
            {post.title}
          </Heading>
          
          <AuthorInfo
            author={formattedPost.author}
            publishDate={formattedPost.publishDate}
          />
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-gray-100">
          <SafeImage
            src={imageUrl}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="blog-content"
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => {
                const tagSlug = typeof tag.slug === "object" ? tag.slug.value : tag.slug;
                return (
                  <Link
                    key={tag._id}
                    href={`/tags/${tagSlug}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {tag.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Link */}
        {post.category && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href={`/categories/${post.category._id}`}
              className="text-primary-600 hover:text-primary-700"
            >
              View more posts in {post.category.name} →
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || "",
    keywords: post.meta_keywords?.join(", ") || "",
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt || "",
      images: post.og_image ? [post.og_image] : [],
      type: post.og_type || "article",
    },
    twitter: {
      card: post.twitter_card || "summary_large_image",
      title: post.twitter_title || post.title,
      description: post.twitter_description || post.excerpt || "",
      images: post.twitter_image ? [post.twitter_image] : [],
    },
  };
}
