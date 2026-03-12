import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, getAllPostsAdmin, createPost } from "@/lib/posts";
import { validateToken } from "@/lib/auth";

function getToken(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  const cookie = req.headers.get("cookie");
  if (cookie) {
    const match = cookie.match(/admin_token=([^;]+)/);
    if (match) return match[1];
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const isAdmin = searchParams.get("admin") === "1";

  if (isAdmin) {
    const token = getToken(req);
    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(getAllPostsAdmin());
  }

  return NextResponse.json(getAllPosts());
}

export async function POST(req: NextRequest) {
  const token = getToken(req);
  if (!token || !validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const required = ["title", "slug", "content"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const post = createPost({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || "",
      content: body.content,
      metaTitle: body.metaTitle || body.title,
      metaDescription: body.metaDescription || body.excerpt || "",
      keywords: body.keywords || "",
      category: body.category || "Tutorial",
      tags: body.tags || [],
      featuredImage: body.featuredImage || "",
      author: body.author || "Migration Expert",
      publishedAt: body.publishedAt || new Date().toISOString(),
      published: body.published ?? false,
      readTime: body.readTime || "5 min read",
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
