import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category?: string;
  readTime?: string;
}

export function BlogCard({
  id,
  title,
  excerpt,
  author,
  date,
  image,
  category,
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={`/blog/${id}`} className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      
      <div className="flex flex-1 flex-col p-6">
        {/* Category */}
        {category && (
          <div className="mb-3">
            <span className="text-xs font-normal text-gray-500">
              {category}
            </span>
          </div>
        )}
        
        {/* Title with Arrow */}
        <Link href={`/blog/${id}`} className="mb-3 group/title">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover/title:text-gray-700 transition-colors inline-flex items-center gap-2">
            {title}
            <svg className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover/title:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </h2>
        </Link>
        
        {/* Excerpt */}
        <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        {/* Author and Date */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 flex-shrink-0">
            <span className="text-xs font-medium text-gray-700">
              {author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{author}</p>
            <p className="text-xs text-gray-500">{formatDate(date)}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

