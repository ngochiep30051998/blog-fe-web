import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

// Mock data - replace with actual data fetching
const getPost = async (slug: string): Promise<BlogPost | null> => {
  const posts: Record<string, BlogPost> = {
    "1": {
      id: "1",
      title: "Getting Started with Next.js 14 App Router",
      content: `
        <p>Next.js 14 introduces the powerful App Router, a new paradigm for building React applications. This article will guide you through the fundamentals and help you get started.</p>
        
        <h2>What is the App Router?</h2>
        <p>The App Router is a new routing system built on React Server Components. It provides a more intuitive way to organize your application and enables better performance through server-side rendering.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Server Components by default</li>
          <li>Built-in layouts and nested routing</li>
          <li>Streaming and Suspense support</li>
          <li>Improved data fetching</li>
        </ul>
        
        <h2>Getting Started</h2>
        <p>To create a new Next.js 14 project with the App Router, simply run:</p>
        <pre><code>npx create-next-app@latest my-app</code></pre>
        
        <p>The App Router uses a file-system based routing system. Create a <code>page.tsx</code> file in the <code>app</code> directory to define a route.</p>
      `,
      author: "John Doe",
      date: "2024-01-15",
      image: "/images/blog-1.jpg",
      category: "Technology",
      readTime: "5 min read",
    },
  };

  return posts[slug] || null;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[400px] w-full overflow-hidden bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-3xl">
            {/* Category & Date */}
            <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
              {post.category && (
                <>
                  <Link
                    href={`/blog/category/${post.category.toLowerCase()}`}
                    className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-900 hover:bg-gray-200 transition-colors"
                  >
                    {post.category}
                  </Link>
                  <span>•</span>
                </>
              )}
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
              {post.title}
            </h1>

            {/* Author */}
            <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                <span className="text-lg font-medium text-gray-700">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-600">Author</p>
              </div>
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-gray-900 prose-a:underline hover:prose-a:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <div className="mt-12 border-t border-gray-200 pt-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Share this article</h3>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Share
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Tweet
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Blog
              </Link>
              <Link
                href="/blog"
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

