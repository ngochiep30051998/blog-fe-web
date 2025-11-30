import Link from "next/link";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { Heading } from "@/components/ui/Heading";
import { AuthorInfo } from "@/components/ui/AuthorInfo";
import { ExternalLinkIcon } from "@/components/ui/icons/ExternalLinkIcon";
import { SafeImage } from "@/components/ui/SafeImage";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const href = post.link || `/blog/${post.slug}`;

  return (
    <Link
      href={href}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-gray-100">
        <SafeImage
          src={post.imageUrl}
          alt={post.imageAlt}
          fill
          className="group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <CategoryTag text={post.category} variant="secondary" />
        
        <div className="flex items-start justify-between gap-2">
          <Heading level="h2" className="line-clamp-2 group-hover:text-primary-700 transition-colors flex-1">
            {post.title}
          </Heading>
          <div className="text-gray-500 group-hover:text-primary-700 transition-colors flex-shrink-0 mt-1">
            <ExternalLinkIcon size={20} />
          </div>
        </div>
        
        <p className="text-base leading-6 text-gray-500 line-clamp-3">
          {post.description}
        </p>
        
        <div className="pt-2">
          <AuthorInfo author={post.author} publishDate={post.publishDate} />
        </div>
      </div>
    </Link>
  );
}
