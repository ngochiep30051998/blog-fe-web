# API Integration Summary

This document describes the API integration for all `/web/` endpoints from the backend.

## Backend URL
- Base URL: `http://localhost:8000`
- All `/web/` endpoints are public (no authentication required)

## Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Implemented Endpoints

### Posts API
1. **GET /web/posts** - Get all published blog posts
   - Query params: `page`, `page_size`, `category_id`, `tag_ids`, `tag_names`, `tag_slugs`, `match_all`
   - Used in: Home page (`app/page.tsx`)

2. **GET /web/posts/slug/{slug}** - Get post by slug
   - Used in: Blog post detail page (`app/blog/[slug]/page.tsx`)

3. **GET /web/posts/category/{category_id}** - Get posts by category
   - Query params: `page`, `page_size`
   - Used in: Category detail page (`app/categories/[id]/page.tsx`)

4. **GET /web/posts/tag/{tag_slug}** - Get posts by tag
   - Query params: `page`, `page_size`
   - Used in: Tag detail page (`app/tags/[slug]/page.tsx`)

### Categories API
5. **GET /web/categories** - Get all categories
   - Query params: `page`, `page_size`
   - Used in: Categories listing page (`app/categories/page.tsx`)

6. **GET /web/categories/{category_id}** - Get category by ID
   - Used in: Category detail page (`app/categories/[id]/page.tsx`)

### Tags API
7. **GET /web/tags** - Get all tags
   - Query params: `page`, `page_size`
   - Used in: Tags listing page (`app/tags/page.tsx`)

8. **GET /web/tags/{tag_id}** - Get tag by ID
   - Available but not used in UI (can be used if needed)

9. **GET /web/tags/slug/{slug}** - Get tag by slug
   - Used in: Tag detail page (`app/tags/[slug]/page.tsx`)

## File Structure

### API Client
- `lib/api.ts` - All API client functions
- `types/api.ts` - TypeScript types for API responses
- `lib/utils.ts` - Utility functions to convert API responses to component formats

### Pages Created
- `app/page.tsx` - Home page (fetches posts from API)
- `app/blog/[slug]/page.tsx` - Blog post detail page
- `app/categories/page.tsx` - Categories listing page
- `app/categories/[id]/page.tsx` - Category detail page with posts
- `app/tags/page.tsx` - Tags listing page
- `app/tags/[slug]/page.tsx` - Tag detail page with posts

### Components
- `components/layout/Navigation.tsx` - Navigation header with links to Home, Categories, Tags
- Updated `app/layout.tsx` - Added Navigation component

## Data Flow

1. **Server Components** fetch data using API client functions
2. **API responses** are converted to component-friendly formats using `formatPostResponse()`
3. **Components** receive formatted data and render UI
4. **Pagination** is handled via URL search params (`?page=1`)

## Features

- ✅ All 9 `/web/` endpoints integrated
- ✅ TypeScript types for all API responses
- ✅ Error handling with fallbacks
- ✅ Pagination support
- ✅ SEO metadata generation
- ✅ Navigation between pages
- ✅ Responsive design
- ✅ Loading states with Suspense

## Usage Examples

### Fetching Posts
```typescript
import { getPosts } from "@/lib/api";
import { formatPostResponse } from "@/lib/utils";

const response = await getPosts({ page: 1, page_size: 12 });
const posts = response.data?.map(formatPostResponse) || [];
```

### Fetching a Single Post
```typescript
import { getPostBySlug } from "@/lib/api";

const response = await getPostBySlug("my-post-slug");
const post = response.data;
```

### Fetching Categories
```typescript
import { getCategories } from "@/lib/api";

const response = await getCategories({ page: 1, page_size: 100 });
const categories = response.data || [];
```

## Notes

- All API calls are made from Server Components (no client-side fetching)
- The API client uses `cache: "no-store"` for fresh data (can be optimized later)
- Slug handling: API returns slugs as objects with `{ value: string }`, utility functions handle this
- Image URLs: Falls back to placeholder if thumbnail/banner is not available
- Error handling: Returns empty arrays/null on errors (can be enhanced with error pages)
