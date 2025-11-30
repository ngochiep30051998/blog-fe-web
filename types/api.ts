// API Response Types based on OpenAPI schema

export interface Slug {
  value: string;
}

export interface TagResponse {
  _id: string;
  name: string;
  slug: Slug;
  description?: string | null;
  usage_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  _id: string;
  name: string;
  description?: string | null;
  slug: Slug;
  parent_id?: string | null;
  path: string;
  created_at: string;
  updated_at: string;
  published_at?: string | null;
  children?: CategoryResponse[];
}

export interface PostResponse {
  _id: string;
  slug: Slug;
  title: string;
  content: string;
  excerpt?: string | null;
  author_name?: string | null;
  author_email?: string | null;
  status: string;
  tags: TagResponse[];
  category?: CategoryResponse | null;
  views_count: number;
  likes_count: number;
  thumbnail?: string | null;
  banner?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string[];
  meta_robots?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  og_type?: string | null;
  twitter_card?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image?: string | null;
  canonical_url?: string | null;
  created_at: string;
  updated_at: string;
  published_at?: string | null;
}

export interface BaseResponse<T> {
  success: boolean;
  message?: string | null;
  data?: T | null;
  total?: number | null;
  page?: number | null;
  page_size?: number | null;
}

export type PostsResponse = BaseResponse<PostResponse[]>;
export type PostResponseSingle = BaseResponse<PostResponse>;
export type CategoriesResponse = BaseResponse<CategoryResponse[]>;
export type CategoryResponseSingle = BaseResponse<CategoryResponse>;
export type TagsResponse = BaseResponse<TagResponse[]>;
export type TagResponseSingle = BaseResponse<TagResponse>;
