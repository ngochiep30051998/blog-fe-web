"use client";

import { useState, useMemo } from "react";
import { HeroSection } from "./HeroSection";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { LoadMoreSection } from "./LoadMoreSection";
import type { BlogPost } from "@/types/blog";

interface PageWrapperProps {
  initialPosts: BlogPost[];
}

export function PageWrapper({ initialPosts }: PageWrapperProps) {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(
    initialPosts.slice(0, 6)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setDisplayedPosts(initialPosts.slice(0, 6));
      return;
    }

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedPosts(filtered);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      const currentCount = displayedPosts.length;
      const nextPosts = initialPosts.slice(
        currentCount,
        currentCount + 3
      );
      if (nextPosts.length > 0) {
        setDisplayedPosts([...displayedPosts, ...nextPosts]);
      }
      setIsLoading(false);
    }, 500);
  };

  const hasMore = useMemo(() => {
    return displayedPosts.length < initialPosts.length && searchQuery === "";
  }, [displayedPosts.length, initialPosts.length, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection onSearch={handleSearch} />
        
        <div className="py-8 lg:py-12">
          <BlogGrid posts={displayedPosts} />
        </div>
        
        <LoadMoreSection
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
}
