import Link from "next/link";
import { getRecentPosts } from "@/lib/posts";
import { Calendar, Clock, ArrowRight } from "lucide-react";

import Image from "next/image";

const LovableLogo = ({ size = 16 }) => (
  <Image 
    src="/favicon.ico" 
    alt="Lovable Logo" 
    width={size} 
    height={size} 
    className="rounded-sm"
  />
);

export default async function BlogPreview() {
  const posts = await getRecentPosts(3);

  return (
    <section className="section-padding bg-surface/50 border-y border-border/50">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div className="max-w-xl text-left">
            <span className="pill mb-4">
              <LovableLogo />
              Migration Insights
            </span>
            <h2 className="h2 mb-4">
              Expert Guides &<br />
              <span className="primary-gradient-text italic">Technical Resources</span>
            </h2>
            <p className="text-text-muted text-lg">
              Deep dives into database architecture, security best practices, and migration case studies.
            </p>
          </div>
          <Link
            href="/blog"
            className="btn-secondary px-8 py-4 text-sm group"
          >
            Explore All Guides
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="glass-card !p-0 block group overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 shadow-xl">

              {/* Card visual */}
              <div className="aspect-[16/9] flex items-center justify-center p-8 bg-black/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="text-center relative z-10 transition-transform duration-500 group-hover:scale-105">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/20 text-primary border border-primary/20">
                    {post.category}
                  </span>
                  <div className="w-12 h-[2px] bg-primary/30 mx-auto mb-4" />
                  <p className="text-white/60 font-black text-[10px] uppercase tracking-[0.2em] max-w-[150px] mx-auto leading-tight">
                    Case Study #{post.id.toString().padStart(2, '0')}
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-5 text-[10px] font-black uppercase tracking-widest text-text-subtle">
                  <span className="flex items-center gap-1.5" suppressHydrationWarning>
                    <Calendar size={12} className="text-primary" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-primary" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2 italic">
                  {post.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-8">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:text-white transition-colors">
                  Read Full Guide
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
