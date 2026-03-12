import postsData from "@/data/posts.json";
import { supabase } from "./supabase";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  publishedAt: string;
  published: boolean;
  readTime: string;
  faqs?: { q: string; a: string }[];
}

// Map snake_case from DB to camelCase for the frontend
function mapPost(dbPost: any): Post {
  return {
    id: dbPost.id,
    title: dbPost.title,
    slug: dbPost.slug,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    metaTitle: dbPost.meta_title,
    metaDescription: dbPost.meta_description,
    keywords: dbPost.keywords,
    category: dbPost.category,
    tags: dbPost.tags,
    featuredImage: dbPost.featured_image,
    author: dbPost.author,
    publishedAt: dbPost.published_at,
    published: dbPost.published,
    readTime: dbPost.read_time,
    faqs: dbPost.faqs
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error || !data) {
    console.error('Supabase fetch failed, falling back to local JSON:', error?.message);
    return (postsData as Post[]).filter(p => p.published).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  return data.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) {
    return (postsData as Post[]).find((p) => p.slug === slug && p.published);
  }

  return mapPost(data);
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return [...new Set(posts.map((p) => p.category))];
}

export async function getRecentPosts(limit = 3): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

