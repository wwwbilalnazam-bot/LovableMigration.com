import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRecentPosts } from "@/lib/posts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

const WA_LINK =
  "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    alternates: { canonical: `https://lovablemigration.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const recentPosts = (await getRecentPosts(3)).filter((p) => p.slug !== slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metaTitle,
    description: post.metaDescription,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    keywords: post.keywords,
    publisher: {
      "@type": "Organization",
      name: "Lovable to Supabase Migration",
      url: "https://lovablemigration.com",
    },
  };

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        {/* Post Header */}
        <section className="section-padding bg-surface/30 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-glow opacity-[0.02] blur-[150px] pointer-events-none" />
          
          <div className="container max-w-4xl mx-auto px-6 relative z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-12 text-primary hover:text-white transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
              Back to Resources
            </Link>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/20 text-primary border border-primary/20">
                {post.category}
              </span>
            </div>

            <h1 className="h1 mb-8 italic">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-[11px] font-black uppercase tracking-widest text-text-subtle">
              <span className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary border border-primary/20">
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                {post.author}
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/10" />
              <span className="flex items-center gap-2" suppressHydrationWarning>
                <Calendar size={14} className="text-primary" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/10" />
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-primary" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <div className="container max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Main Article */}
            <article className="lg:col-span-8">
              <div className="glass-card p-8 md:p-12 bg-surface/20 border-white/5">
                <div
                  className="prose prose-invert prose-primary max-w-none prose-headings:italic prose-headings:font-black prose-p:text-text-muted prose-p:leading-relaxed prose-li:text-text-muted prose-strong:text-white"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-16 pt-10 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-text-subtle">
                    Categorized In
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-4 py-2 rounded-lg font-black uppercase tracking-widest bg-white/5 text-text-subtle border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="mt-16 pt-10 border-t border-white/5">
                    <h2 className="text-2xl font-black text-white italic mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                      {post.faqs.map((faq, i) => (
                        <div key={i} className="glass-card bg-surface/10 border-white/5 p-6 md:p-8">
                          <h3 className="text-lg font-black text-primary italic mb-3">{faq.q}</h3>
                          <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social share */}
                <div className="mt-10 pt-10 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-text-subtle text-center sm:text-left">
                    Share This Intelligence
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    {[
                      {
                        label: "Twitter / X",
                        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://lovablemigration.com/blog/${post.slug}`)}`,
                        bg: "bg-[#1DA1F2]",
                      },
                      {
                        label: "LinkedIn",
                        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://lovablemigration.com/blog/${post.slug}`)}`,
                        bg: "bg-[#0A66C2]",
                      },
                      {
                        label: "WhatsApp",
                        href: `https://wa.me/?text=${encodeURIComponent(post.title + " " + `https://lovablemigration.com/blog/${post.slug}`)}`,
                        color: "text-primary",
                        border: "border-primary/20",
                        bg: "bg-primary/10",
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl transition-all hover:-translate-y-1 shadow-lg ${s.bg} ${s.color || 'text-white'} ${s.border || 'border-transparent'} border`}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* In-Article CTA */}
              <div className="mt-12 p-10 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-dark border-none relative overflow-hidden group shadow-[0_20px_50px_rgba(62,207,142,0.3)]">
                <div className="absolute inset-0 bg-white/5 opacity-50" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-black italic mb-4 leading-tight">
                    Start Your Migration Strategy
                  </h3>
                  <p className="text-black/80 font-bold mb-10 text-base max-w-lg">
                    Don't let vendor lock-in stifle your growth. Get a professional roadmap to Supabase excellence today.
                  </p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl bg-black text-white hover:bg-black/80 transition-all shadow-2xl active:scale-95 group"
                  >
                    Free Architectural Audit
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Sticky Sidebar Container */}
              <div className="sticky top-24 space-y-8">
                {/* Promo Card */}
                <div className="glass-card p-8 bg-surface/50 border-primary/20 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  <h3 className="text-lg font-black text-white italic mb-4">Migration Pricing</h3>
                  <p className="text-text-muted text-sm mb-8 leading-relaxed font-semibold italic">
                    Simple, flat-rate migrations for growing apps.
                  </p>
                  <div className="mb-8">
                    <span className="text-3xl font-black text-white">$300</span>
                    <span className="text-text-subtle text-xs font-black uppercase tracking-widest ml-2">Starting at</span>
                  </div>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-4 text-xs shadow-xl"
                  >
                    View Details →
                  </a>
                </div>

                {/* Recent Intelligence */}
                <div className="glass-card p-8 bg-surface/30 border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-white/40">Latest Resources</h4>
                  <div className="space-y-8">
                    {recentPosts.slice(0, 3).map((p) => (
                      <Link
                        key={p.id}
                        href={`/blog/${p.slug}`}
                        className="block group"
                      >
                        <div className="flex flex-col gap-3">
                          <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors">
                            {p.category}
                          </span>
                          <p className="text-sm font-black text-white italic group-hover:text-primary transition-all line-clamp-2 leading-tight">
                            {p.title}
                          </p>
                          <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-text-subtle">
                            <span>{p.readTime}</span>
                            <span className="w-1 h-1 bg-white/10 rounded-full" />
                            <span suppressHydrationWarning>{new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mt-12 text-primary hover:text-white transition-all group"
                  >
                    All Research
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
