import Link from "next/link";

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-bold text-primary-600 hover:text-primary-700"
          >
            Blog
          </Link>
          
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/tags"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Tags
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
