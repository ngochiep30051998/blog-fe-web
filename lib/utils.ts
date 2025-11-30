// Utility functions to convert API responses to component-friendly formats

import type { PostResponse, CategoryResponse, TagResponse } from "@/types/api";
import type { BlogPost, Author } from "@/types/blog";

export function formatPostResponse(post: PostResponse): BlogPost {
  const slugValue = typeof post.slug === "object" ? post.slug.value : post.slug;
  
  const author: Author = {
    name: post.author_name || "Unknown Author",
    avatarUrl: undefined, // API doesn't provide avatar URL
  };

  // Format date on the server side to ensure consistency between server and client
  const dateString = post.published_at || post.created_at;
  const formattedDate = dateString ? formatDate(dateString) : "";

  return {
    id: post._id,
    title: post.title,
    description: post.excerpt || post.meta_description || "",
    category: post.category?.name || "Uncategorized",
    imageUrl: post.thumbnail || post.banner || null, // SafeImage will handle null/empty
    imageAlt: post.title,
    author,
    publishDate: formattedDate,
    slug: slugValue,
    link: undefined,
  };
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "";
    }
    
    // Use explicit locale and options to ensure consistent formatting
    // between server and client
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Use UTC to avoid timezone differences
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

export function getCategoryName(category: CategoryResponse | null | undefined): string {
  return category?.name || "Uncategorized";
}

export function getTagNames(tags: TagResponse[]): string[] {
  return tags.map((tag) => tag.name);
}
