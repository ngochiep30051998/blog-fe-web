"use client";

import { DownArrowIcon } from "./icons/DownArrowIcon";

interface LoadMoreButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
}

export function LoadMoreButton({
  onClick,
  isLoading = false,
  className = "",
}: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center gap-2 px-6 py-3 bg-primary-100 text-primary-700 font-medium rounded-lg hover:bg-primary-200 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label="Load more blog posts"
    >
      {!isLoading && <DownArrowIcon size={20} className="text-primary-700" />}
      <span>{isLoading ? "Loading..." : "Load more"}</span>
    </button>
  );
}
