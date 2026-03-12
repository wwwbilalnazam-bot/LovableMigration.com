import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategories } from "@/lib/posts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Lovable to Supabase Migration Blog | Guides, Tips & Tutorials",
  description:
    "Expert guides on migrating from Lovable Cloud to Supabase. Tutorials, comparisons, and best practices for SaaS founders and developers.",
  alternates: { canonical: "https://lovablemigration.com/blog" },
};

const WaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WA_LINK =
  "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getCategories();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        {/* Hero */}
        <section className="section-padding bg-surface/30 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-glow opacity-[0.03] blur-[150px] pointer-events-none" />
          
          <div className="container max-w-6xl mx-auto px-6 text-center relative z-10">
            <span className="pill mb-6">Migration Insights</span>
            <h1 className="h1 mb-6">
              The Migration<br />
              <span className="primary-gradient-text italic">Best Practices Blog</span>
            </h1>
            <p className="text-text-muted text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Expert tutorials, case studies, and deep-technical guides for moving your Lovable Cloud app to Supabase.
            </p>
            
            {/* Search bar (visual only) */}
            <div className="relative max-w-xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative glass-card !p-0 flex items-center bg-black/40 border-primary/20">
                <Search size={18} className="ml-4 md:ml-6 text-text-subtle" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full bg-transparent pl-3 md:pl-4 pr-6 py-4 md:py-5 text-sm md:text-base text-white placeholder:text-text-subtle outline-none font-medium"
                  readOnly
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container max-w-6xl mx-auto px-6 py-20">
          {/* Categories */}
          <div className="flex flex-nowrap items-center justify-start sm:justify-center gap-3 mb-16 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
            <span className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest bg-primary text-black cursor-pointer shadow-[0_0_20px_rgba(62,207,142,0.3)] whitespace-nowrap">
              All Posts
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest bg-white/5 text-text-muted cursor-pointer hover:bg-white/10 hover:text-white transition-all border border-white/5 whitespace-nowrap"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="block mb-20 group">
              <div className="glass-card !p-0 overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-black/40 border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-2xl">
                <div className="aspect-video md:aspect-auto flex items-center justify-center p-12 bg-black/60 relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-center relative z-10 group-hover:scale-105 transition-transform duration-700">
                    <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 bg-primary/20 text-primary border border-primary/20">
                      Featured Guide
                    </span>
                    <h2 className="text-3xl font-black text-white italic leading-tight mb-4">{featured.title}</h2>
                    <div className="w-16 h-1 bg-primary/30 mx-auto" />
                  </div>
                </div>
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-6 mb-6 text-[10px] font-black uppercase tracking-widest text-text-subtle">
                    <span className="flex items-center gap-2" suppressHydrationWarning>
                      <Calendar size={14} className="text-primary" />
                      {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-primary" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white italic mb-6 group-hover:text-primary transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-text-muted text-base leading-relaxed mb-8 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {featured.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest bg-white/5 text-text-subtle border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:text-white transition-all">
                    Read Full Article
                    <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="glass-card !p-0 block group overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 shadow-xl bg-surface/30">
                <div className="aspect-video flex items-center justify-center p-8 bg-black/40 relative overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-center relative z-10 transition-transform duration-500 group-hover:scale-105">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/20 text-primary border border-primary/20">
                      {post.category}
                    </span>
                    <div className="w-12 h-[2px] bg-primary/30 mx-auto mb-4" />
                    <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] max-w-[150px] mx-auto leading-tight">
                      Blog Post #{post.id.toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-5 text-[10px] font-black uppercase tracking-widest text-text-subtle">
                    <span className="flex items-center gap-2" suppressHydrationWarning>
                      <Calendar size={12} className="text-primary" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={12} className="text-primary" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white italic leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:text-white transition-colors">
                    Read More
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="!p-12 md:!p-16 text-center bg-gradient-to-br from-primary via-primary to-primary-dark rounded-3xl shadow-[0_30px_60px_rgba(62,207,142,0.2)] relative overflow-hidden border-none group">
            <div className="absolute inset-0 bg-white/5 opacity-50" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-black italic mb-6 leading-tight">
                Ready to Scale Without Limits?
              </h2>
              <p className="text-black/80 font-bold text-lg mb-10 leading-relaxed">
                Stop fighting proprietary restrictions. Let our experts migrate your Lovable Cloud app to Supabase safely, starting at just $300.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-black text-sm uppercase tracking-widest px-10 py-5 rounded-2xl bg-black text-white transition-all hover:scale-105 shadow-2xl hover:bg-black/90 group"
              >
                <WaIcon />
                Start My Free Assessment
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
