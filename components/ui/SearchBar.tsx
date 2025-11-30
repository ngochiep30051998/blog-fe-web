"use client";

import { SearchIcon } from "./icons/SearchIcon";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Search",
  onSearch,
  className = "",
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-700 transition-all duration-150"
        aria-label="Search blog posts"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        <SearchIcon size={20} />
      </div>
    </form>
  );
}
