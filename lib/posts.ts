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

export async function getAllPostsAdmin(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) {
    return postsData as Post[];
  }

  return data.map(mapPost);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return (postsData as Post[]).find((p) => p.id === id);
  }

  return mapPost(data);
}

export async function createPost(post: Omit<Post, "id">): Promise<Post> {
  const { data, error } = await supabase
    .from('posts')
    .insert([{
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      meta_title: post.metaTitle,
      meta_description: post.metaDescription,
      keywords: post.keywords,
      category: post.category,
      tags: post.tags,
      featured_image: post.featuredImage,
      author: post.author,
      published_at: post.publishedAt,
      published: post.published,
      read_time: post.readTime,
      faqs: post.faqs
    }])
    .select()
    .single();

  if (error) throw error;
  return mapPost(data);
}

export async function updatePost(id: string, post: Partial<Post>): Promise<Post> {
  const updateData: any = {};
  if (post.title !== undefined) updateData.title = post.title;
  if (post.slug !== undefined) updateData.slug = post.slug;
  if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
  if (post.content !== undefined) updateData.content = post.content;
  if (post.metaTitle !== undefined) updateData.meta_title = post.metaTitle;
  if (post.metaDescription !== undefined) updateData.meta_description = post.metaDescription;
  if (post.keywords !== undefined) updateData.keywords = post.keywords;
  if (post.category !== undefined) updateData.category = post.category;
  if (post.tags !== undefined) updateData.tags = post.tags;
  if (post.featuredImage !== undefined) updateData.featured_image = post.featuredImage;
  if (post.author !== undefined) updateData.author = post.author;
  if (post.publishedAt !== undefined) updateData.published_at = post.publishedAt;
  if (post.published !== undefined) updateData.published = post.published;
  if (post.readTime !== undefined) updateData.read_time = post.readTime;
  if (post.faqs !== undefined) updateData.faqs = post.faqs;

  const { data, error } = await supabase
    .from('posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapPost(data);
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }
  return true;
}
