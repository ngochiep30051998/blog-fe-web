import Link from "next/link";

export function Sidebar() {
  const categories = [
    { name: "Technology", count: 12 },
    { name: "Design", count: 8 },
    { name: "Development", count: 15 },
    { name: "Lifestyle", count: 6 },
    { name: "Business", count: 9 },
  ];

  const recentPosts = [
    { id: "1", title: "Getting Started with Next.js 14" },
    { id: "2", title: "Modern CSS Techniques" },
    { id: "3", title: "TypeScript Best Practices" },
    { id: "4", title: "Building Responsive Layouts" },
  ];

  const tags = [
    "React", "Next.js", "TypeScript", "CSS", "JavaScript",
    "Web Development", "Design", "Tutorial", "Tips"
  ];

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Search</h3>
        <div className="relative">
          <input
            type="search"
            placeholder="Search articles..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/blog/category/${category.name.toLowerCase()}`}
                className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-gray-400">({category.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.id}`}
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors line-clamp-2"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Newsletter</h3>
        <p className="mb-4 text-sm text-gray-600">
          Subscribe to get the latest articles delivered to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}

