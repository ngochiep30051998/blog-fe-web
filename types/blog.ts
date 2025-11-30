export interface Author {
  name: string;
  avatarUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  author: Author;
  publishDate: string;
  slug: string;
  link?: string;
}
