// API Client for /web/ endpoints
// Backend URL: http://localhost:8000/web/

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface GetPostsParams {
  page?: number;
  page_size?: number;
  category_id?: string;
  tag_ids?: string[];
  tag_names?: string[];
  tag_slugs?: string[];
  match_all?: boolean;
}

export interface GetCategoriesParams {
  page?: number;
  page_size?: number;
}

export interface GetTagsParams {
  page?: number;
  page_size?: number;
}

export interface GetPostsByCategoryParams {
  category_id: string;
  page?: number;
  page_size?: number;
}

export interface GetPostsByTagParams {
  tag_slug: string;
  page?: number;
  page_size?: number;
}

import type {
  PostsResponse,
  PostResponseSingle,
  CategoriesResponse,
  CategoryResponseSingle,
  TagsResponse,
  TagResponseSingle,
} from "@/types/api";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store", // Always fetch fresh data for now
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

// Posts API
export async function getPosts(params?: GetPostsParams): Promise<PostsResponse> {
  const queryString = params ? buildQueryString(params) : "";
  return fetchAPI<PostsResponse>(`/web/posts${queryString}`);
}

export async function getPostBySlug(slug: string): Promise<PostResponseSingle> {
  return fetchAPI<PostResponseSingle>(`/web/posts/slug/${slug}`);
}

export async function getPostsByCategory(
  params: GetPostsByCategoryParams
): Promise<PostsResponse> {
  const { category_id, ...queryParams } = params;
  const queryString = buildQueryString(queryParams);
  return fetchAPI<PostsResponse>(`/web/posts/category/${category_id}${queryString}`);
}

export async function getPostsByTag(
  params: GetPostsByTagParams
): Promise<PostsResponse> {
  const { tag_slug, ...queryParams } = params;
  const queryString = buildQueryString(queryParams);
  return fetchAPI<PostsResponse>(`/web/posts/tag/${tag_slug}${queryString}`);
}

// Categories API
export async function getCategories(
  params?: GetCategoriesParams
): Promise<CategoriesResponse> {
  const queryString = params ? buildQueryString(params) : "";
  return fetchAPI<CategoriesResponse>(`/web/categories${queryString}`);
}

export async function getCategoryById(
  category_id: string
): Promise<CategoryResponseSingle> {
  return fetchAPI<CategoryResponseSingle>(`/web/categories/${category_id}`);
}

// Tags API
export async function getTags(params?: GetTagsParams): Promise<TagsResponse> {
  const queryString = params ? buildQueryString(params) : "";
  return fetchAPI<TagsResponse>(`/web/tags${queryString}`);
}

export async function getTagById(tag_id: string): Promise<TagResponseSingle> {
  return fetchAPI<TagResponseSingle>(`/web/tags/${tag_id}`);
}

export async function getTagBySlug(slug: string): Promise<TagResponseSingle> {
  return fetchAPI<TagResponseSingle>(`/web/tags/slug/${slug}`);
}
