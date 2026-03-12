"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/lib/posts";

interface Props {
  post?: Partial<Post>;
  mode: "new" | "edit";
}

const defaultPost: Partial<Post> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  category: "Tutorial",
  tags: [],
  featuredImage: "",
  author: "Migration Expert",
  publishedAt: new Date().toISOString(),
  published: false,
  readTime: "5 min read",
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function PostEditor({ post = defaultPost, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Post>>({ ...defaultPost, ...post });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [tagsInput, setTagsInput] = useState(post.tags?.join(", ") || "");
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "settings">("content");
  const [preview, setPreview] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && mode === "new") {
        updated.slug = slugify(value);
        if (!updated.metaTitle) updated.metaTitle = value;
      }
      return updated;
    });
  };

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      published: publish !== undefined ? publish : form.published,
    };

    try {
      const url = mode === "edit" ? `/api/posts/${post.id}` : "/api/posts";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      if (mode === "new") {
        const data = await res.json();
        router.push(`/admin/posts/${data.id}`);
      }
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "content", label: "Content" },
    { id: "seo", label: "SEO" },
    { id: "settings", label: "Settings" },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-lg hover:bg-green-100 transition-colors"
            style={{ color: "#0B4F36" }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="text-xl font-extrabold" style={{ color: "#0B4F36" }}>
              {mode === "new" ? "New Post" : "Edit Post"}
            </h2>
            {form.slug && (
              <p className="text-xs" style={{ color: "#888" }}>/{form.slug}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {form.slug && form.published && (
            <Link
              href={`/blog/${form.slug}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border"
              style={{ borderColor: "#e0ede8", color: "#888" }}
            >
              <Eye size={14} /> Preview
            </Link>
          )}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all"
            style={{ borderColor: "#3ECF8E", color: "#0B4F36" }}
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ background: saving ? "#ccc" : "#3ECF8E", color: "#0B4F36" }}
          >
            <Save size={14} />
            {saving ? "Saving..." : saved ? "Saved!" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "#FFECEC", color: "#c0392b" }}>
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: "#e8f4ef" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-3 text-sm font-semibold border-b-2 transition-all"
            style={{
              borderColor: activeTab === tab.id ? "#3ECF8E" : "transparent",
              color: activeTab === tab.id ? "#0B4F36" : "#888",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {activeTab === "content" && (
            <>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  Post Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title || ""}
                  onChange={handleChange}
                  placeholder="e.g. How to Migrate Lovable Cloud to Supabase"
                  className="form-input text-lg font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  URL Slug *
                </label>
                <div className="flex items-center gap-0 border-2 rounded-xl overflow-hidden" style={{ borderColor: "#e0ede8" }}>
                  <span className="px-3 py-3 text-sm" style={{ background: "#f0faf5", color: "#888" }}>
                    /blog/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    value={form.slug || ""}
                    onChange={handleChange}
                    className="flex-1 px-3 py-3 text-sm outline-none"
                    style={{ color: "#111" }}
                    placeholder="post-url-slug"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  Excerpt (used in blog listing)
                </label>
                <textarea
                  name="excerpt"
                  value={form.excerpt || ""}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief description of the post..."
                  className="form-input resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  Content (HTML supported)
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setPreview(false)}
                    className="text-xs px-3 py-1 rounded-lg font-semibold"
                    style={{
                      background: !preview ? "#3ECF8E" : "transparent",
                      color: !preview ? "#0B4F36" : "#888",
                      border: "1px solid #e0ede8",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setPreview(true)}
                    className="text-xs px-3 py-1 rounded-lg font-semibold"
                    style={{
                      background: preview ? "#3ECF8E" : "transparent",
                      color: preview ? "#0B4F36" : "#888",
                      border: "1px solid #e0ede8",
                    }}
                  >
                    Preview
                  </button>
                </div>
                {preview ? (
                  <div
                    className="prose-blog border-2 rounded-xl p-5 min-h-64 bg-white"
                    style={{ borderColor: "#e0ede8" }}
                    dangerouslySetInnerHTML={{ __html: form.content || "<p>Nothing to preview yet.</p>" }}
                  />
                ) : (
                  <textarea
                    name="content"
                    value={form.content || ""}
                    onChange={handleChange}
                    rows={20}
                    placeholder="<h2>Your content here...</h2><p>HTML is supported.</p>"
                    className="form-input resize-y font-mono text-xs"
                    style={{ minHeight: "400px" }}
                  />
                )}
              </div>
            </>
          )}

          {activeTab === "seo" && (
            <>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  SEO Title (max 60 chars)
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={form.metaTitle || ""}
                  onChange={handleChange}
                  placeholder="SEO-optimized title..."
                  className="form-input"
                  maxLength={70}
                />
                <p className="text-xs mt-1" style={{ color: "#aaa" }}>
                  {(form.metaTitle || "").length}/70 characters
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  Meta Description (max 160 chars)
                </label>
                <textarea
                  name="metaDescription"
                  value={form.metaDescription || ""}
                  onChange={handleChange}
                  rows={3}
                  placeholder="SEO meta description..."
                  className="form-input resize-none"
                  maxLength={170}
                />
                <p className="text-xs mt-1" style={{ color: "#aaa" }}>
                  {(form.metaDescription || "").length}/170 characters
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  Focus Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={form.keywords || ""}
                  onChange={handleChange}
                  placeholder="lovable migration, supabase migration..."
                  className="form-input"
                />
              </div>
            </>
          )}

          {activeTab === "settings" && (
            <>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  Featured Image URL
                </label>
                <input
                  type="text"
                  name="featuredImage"
                  value={form.featuredImage || ""}
                  onChange={handleChange}
                  placeholder="/blog/image.jpg"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={form.author || ""}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  Read Time
                </label>
                <input
                  type="text"
                  name="readTime"
                  value={form.readTime || ""}
                  onChange={handleChange}
                  placeholder="5 min read"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#0B4F36" }}>
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  name="publishedAt"
                  value={form.publishedAt ? new Date(form.publishedAt).toISOString().slice(0, 16) : ""}
                  onChange={(e) =>
                    setForm({ ...form, publishedAt: new Date(e.target.value).toISOString() })
                  }
                  className="form-input"
                />
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish box */}
          <div className="bg-white rounded-2xl border border-green-100 p-5">
            <h3 className="font-bold text-sm mb-4" style={{ color: "#0B4F36" }}>Publish</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: "#555" }}>Status</span>
              <span
                className="text-xs px-2 py-1 rounded-full font-semibold"
                style={{
                  background: form.published ? "#E6F5F1" : "#FFECEC",
                  color: form.published ? "#0B4F36" : "#c0392b",
                }}
              >
                {form.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="w-full py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "#3ECF8E", color: "#0B4F36" }}
              >
                {saving ? "Saving..." : "Publish Post"}
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="w-full py-2.5 rounded-xl font-semibold text-sm border-2 transition-all"
                style={{ borderColor: "#e0ede8", color: "#888" }}
              >
                Save as Draft
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border border-green-100 p-5">
            <h3 className="font-bold text-sm mb-3" style={{ color: "#0B4F36" }}>Category</h3>
            <select name="category" value={form.category || ""} onChange={handleChange} className="form-input">
              {["Tutorial", "Migration Guide", "Comparison", "Opinion", "Advanced", "Business", "Features"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-green-100 p-5">
            <h3 className="font-bold text-sm mb-3" style={{ color: "#0B4F36" }}>Tags</h3>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="supabase, migration, tutorial"
              className="form-input text-sm"
            />
            <p className="text-xs mt-1" style={{ color: "#aaa" }}>Comma-separated</p>
          </div>
        </div>
      </div>
    </div>
  );
}
