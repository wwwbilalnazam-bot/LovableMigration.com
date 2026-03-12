import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Link from "next/link";
import { TrendingUp, Lock, Rocket, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Migrate from Lovable Cloud to Supabase in 2025?",
  description: "Discover why top SaaS startups are moving from Lovable Cloud to Supabase. Compare vendor lock-in, scalability, and developer control.",
  keywords: "why migrate from lovable, lovable cloud vs supabase, vendor lock-in, scalable backend",
  alternates: { canonical: "https://lovablemigration.com/why-migrate-from-lovable" },
};

const WA_LINK = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20learn%20more%20about%20why%20Supabase%20is%20better%20for%20my%20app";

export default function ServicePageThree() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Supabase cheaper than Lovable Cloud at scale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many developers report savings of 40-70% after moving from Lovable Cloud to Supabase as their traffic and data usage grow."
        }
      },
      {
        "@type": "Question",
        "name": "Can I keep my frontend when I move to Supabase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. You keep your UI and simply swap the Lovable SDK for the Supabase SDK in your logic layer."
        }
      }
    ]
  };

  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Hero Section */}
        <section className="section-padding bg-surface/30 relative overflow-hidden text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-glow opacity-[0.03] blur-[150px] pointer-events-none" />
            <div className="container max-w-4xl mx-auto px-6 relative z-10">
                <h1 className="h1 mb-6">
                Why Top Startups <span className="primary-gradient-text italic">Migrate from Lovable</span>
                </h1>
                <p className="text-text-muted text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                Discover the technical and financial reasons why founders are moving from Lovable Cloud to the open-source power of Supabase.
                </p>
                <div className="flex justify-center">
                    <a href={WA_LINK} className="btn-wa shadow-2xl">
                        Consult Our Migration Experts
                    </a>
                </div>
            </div>
        </section>

        {/* Content Section */}
        <section className="container max-w-4xl mx-auto px-6 py-20 pb-32">
            <div className="prose prose-invert prose-primary max-w-none prose-headings:italic prose-p:text-text-muted prose-li:text-text-muted">
                <h2>The Limitations of Lovable Cloud</h2>
                <p>
                    Lovable Cloud is an incredible platform for launching quickly. But for serious SaaS founders, the "proprietary wall" eventually becomes a multi-thousand dollar problem. Understanding <strong>why migrate from Lovable</strong> is the first step toward long-term infrastructure stability.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                    <div className="flex flex-col gap-4">
                        <Lock className="text-primary" size={32} />
                        <h4 className="text-white font-black italic text-lg">Vendor Lock-In</h4>
                        <p className="text-sm">When your backend is a "black box," you can't optimize slow queries or add custom SQL functions easily. Supabase is open-source Postgres.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <TrendingUp className="text-primary" size={32} />
                        <h4 className="text-white font-black italic text-lg">Scalability Limits</h4>
                        <p className="text-sm">Proprietary backends often have hidden rate limits and concurrency caps. Supabase scales to millions of users seamlessly.</p>
                    </div>
                </div>

                <h3>Developer Freedom and Control</h3>
                <p>
                    With <strong>Supabase</strong>, you get full access to the database layer. This means you can use Row Level Security (RLS) policies, database triggers, and stored procedures that are simply unavailable on Lovable Cloud. This level of control is essential for building complex, enterprise-grade applications.
                </p>

                <h2>Supabase Performance Benchmarks</h2>
                <p>
                    In our internal testing, applications that <strong>move Lovable app to Supabase</strong> often see a 30-50% reduction in API latency. This is due to Supabase's lean architectural layer and the highly optimized nature of PostgreSQL when hosted on production-ready infrastructure.
                </p>

                <h3>Predictable Pricing at Scale</h3>
                <p>
                    One of the strongest arguments for using a professional <strong>Lovable migration service</strong> is financial. Lovable Cloud's pricing often ramps up steeply as user counts increase. Supabase offers a far more predictable and developer-friendly pricing model, often saving companies thousands of dollars a year in hosting costs.
                </p>
            </div>

            {/* CTA Banner */}
            <div className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark text-center relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-black/5 opacity-50" />
                <h2 className="text-3xl font-black text-black italic mb-6">Build on a Foundation That Scales</h2>
                <p className="text-black/80 font-bold mb-10 text-lg max-w-lg mx-auto">
                    Stop fighting your infrastructure and start building your product. We'll handle the migration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href={WA_LINK} className="btn-primary !bg-black !text-white !border-black hover:!bg-black/80 shadow-2xl px-12 py-5 text-sm uppercase tracking-widest font-black transition-all">
                        Schedule Audit
                    </a>
                    <Link href="/blog" className="btn-secondary !bg-white/10 px-12 py-5 text-sm uppercase tracking-widest font-black">
                        Read Case Studies
                    </Link>
                </div>
            </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
