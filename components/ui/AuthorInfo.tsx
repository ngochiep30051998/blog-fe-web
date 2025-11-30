import { Avatar } from "./Avatar";

interface AuthorInfoProps {
  author: {
    name: string;
    avatarUrl?: string;
  };
  publishDate: string;
  className?: string;
}

export function AuthorInfo({
  author,
  publishDate,
  className = "",
}: AuthorInfoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Avatar
        src={author.avatarUrl}
        alt={author.name}
        name={author.name}
        size="sm"
      />
      <div className="flex flex-col">
        <span className="text-sm font-normal text-gray-900">{author.name}</span>
        <span className="text-sm font-normal text-gray-500">{publishDate}</span>
      </div>
    </div>
  );
}
