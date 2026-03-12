import { NextRequest, NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/posts";
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

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const token = getToken(req);
  if (!token || !validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const updated = updatePost(id, body);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const token = getToken(req);
  if (!token || !validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const updated = updatePost(id, body);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const token = getToken(req);
  if (!token || !validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const success = deletePost(id);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted successfully" });
}
