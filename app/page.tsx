import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { BlogCard } from "@/components/blog/BlogCard";

// Featured posts for homepage
const featuredPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js 14 App Router",
    excerpt: "Learn how to build modern web applications using Next.js 14's powerful App Router and React Server Components.",
    author: "John Doe",
    date: "2024-01-15",
    image: "/images/image.png",
    category: "Technology",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Modern CSS Techniques for 2024",
    excerpt: "Explore the latest CSS features and techniques that will help you build beautiful and performant user interfaces.",
    author: "Jane Smith",
    date: "2024-01-12",
    image: "/images/image.png",
    category: "Design",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "TypeScript Best Practices for React",
    excerpt: "Discover how to write type-safe React components and improve your development experience with TypeScript.",
    author: "Mike Johnson",
    date: "2024-01-10",
    image: "/images/image.png",
    category: "Development",
    readTime: "6 min read",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-5xl font-bold text-gray-900 sm:text-6xl">
                Welcome to Our Blog
              </h1>
              <p className="mb-8 text-xl text-gray-600">
                Discover articles, tutorials, and insights about web development, design, and technology.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/blog"
                  className="rounded-lg bg-black px-6 py-3 text-base font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  Explore Blog
                </Link>
                <Link
                  href="/about"
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Featured Articles</h2>
              <p className="text-lg text-gray-600">
                Check out our latest and most popular articles
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-block rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View All Posts →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
