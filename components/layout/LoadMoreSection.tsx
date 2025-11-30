"use client";

import { LoadMoreButton } from "@/components/ui/LoadMoreButton";

interface LoadMoreSectionProps {
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

export function LoadMoreSection({
  onLoadMore,
  isLoading = false,
  hasMore = true,
}: LoadMoreSectionProps) {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center py-12">
      <LoadMoreButton onClick={onLoadMore} isLoading={isLoading} />
    </div>
  );
}
