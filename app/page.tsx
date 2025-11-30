import { Suspense } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { getPosts } from "@/lib/api";
import { formatPostResponse } from "@/lib/utils";

async function fetchPosts() {
  try {
    const response = await getPosts({ page: 1, page_size: 12 });
    if (response.success && response.data) {
      return response.data.map(formatPostResponse);
    }
    return [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PageWrapper initialPosts={posts} />
    </Suspense>
  );
}
