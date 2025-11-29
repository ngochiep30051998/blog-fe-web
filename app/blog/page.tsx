import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { BlogList } from "@/components/blog/BlogList";

// Mock data - matching the design from the image
const blogPosts = [
  {
    id: "1",
    title: "UX review presentations",
    excerpt: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    author: "Olivia Rhye",
    date: "2022-01-20",
    image: "/images/blog-1.jpg",
    category: "Design",
  },
  {
    id: "2",
    title: "Migrating to Linear 101",
    excerpt: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    author: "Phoenix Baker",
    date: "2022-01-19",
    image: "/images/blog-2.jpg",
    category: "Product",
  },
  {
    id: "3",
    title: "Building your API Stack",
    excerpt: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: "Lana Steiner",
    date: "2022-01-18",
    image: "/images/blog-3.jpg",
    category: "Software Engineering",
  },
  {
    id: "4",
    title: "Bill Walsh leadership lessons",
    excerpt: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    author: "Alec Whitten",
    date: "2022-01-17",
    image: "/images/blog-4.jpg",
    category: "Management",
  },
  {
    id: "5",
    title: "PM mental models",
    excerpt: "Mental models are simple expressions of complex processes or relationships.",
    author: "Demi Wilkinson",
    date: "2022-01-16",
    image: "/images/blog-5.jpg",
    category: "Product",
  },
  {
    id: "6",
    title: "What is Wireframing?",
    excerpt: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    author: "Candice Wu",
    date: "2022-01-15",
    image: "/images/blog-6.jpg",
    category: "Design",
  },
  {
    id: "7",
    title: "How collaboration makes us better designers",
    excerpt: "Collaboration can make our teams stronger, and our individual designs better.",
    author: "Natali Craig",
    date: "2022-01-14",
    image: "/images/blog-7.jpg",
    category: "Design",
  },
  {
    id: "8",
    title: "Our top 10 Javascript frameworks to use",
    excerpt: "JavaScript frameworks make development easy with extensive features and functionalities.",
    author: "Drew Cano",
    date: "2022-01-13",
    image: "/images/blog-8.jpg",
    category: "Product",
  },
  {
    id: "9",
    title: "Podcast: Creating a better CX Community",
    excerpt: "Starting a community doesn't need to be complicated, but how do you get started?",
    author: "Orlando Diggs",
    date: "2022-01-12",
    image: "/images/blog-9.jpg",
    category: "Customer Success",
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white relative">
      <Header />
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-16 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Purple Pill */}
              <div className="inline-flex items-center justify-center mb-6">
                <span className="rounded-full bg-purple-600 px-4 py-1.5 text-sm font-medium text-white">
                  Our blog
                </span>
              </div>
              
              {/* Title */}
              <h1 className="mb-4 text-5xl font-bold text-purple-900 sm:text-6xl">
                Resources and insights
              </h1>
              
              {/* Subtitle */}
              <p className="mb-8 text-lg text-purple-600 sm:text-xl">
                The latest industry news, interviews, technologies, and resources.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pl-12 pr-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BlogList posts={blogPosts} />
            
            {/* Load More Button */}
            <div className="mt-12 flex items-center justify-center">
              <button className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Load more
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

