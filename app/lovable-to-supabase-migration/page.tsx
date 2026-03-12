import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Lovable Cloud to Supabase Migration Service",
  description: "Expert zero-downtime migration from Lovable Cloud to Supabase. We handle your database export, auth migration, and API updates safely.",
  keywords: "lovable cloud to supabase migration, migrate lovable app, lovable migration service, supabase experts",
  alternates: { canonical: "https://lovablemigration.com/lovable-to-supabase-migration" },
};

const WA_LINK = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20discuss%20a%20Lovable%20to%20Supabase%20migration";

export default function ServicePageOne() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does the Lovable to Supabase migration take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most migrations are completed within 3 to 7 business days, depending on the complexity of your authentication and the size of your database."
        }
      },
      {
        "@type": "Question",
        "name": "Will there be any downtime during migration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in zero-downtime migrations using parallel running and blue-green deployment strategies to ensure your users are never interrupted."
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
        <section className="section-padding bg-surface/30 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-glow opacity-[0.03] blur-[150px] pointer-events-none" />
          <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h1 className="h1 mb-6">
              Expert <span className="primary-gradient-text italic">Lovable Cloud to Supabase</span> Migration
            </h1>
            <p className="text-text-muted text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
              Ready to scale? We provide the world's most reliable migration service for moving your Lovable Cloud application to a production-ready Supabase backend.
            </p>
            <div className="flex justify-center">
              <a href={WA_LINK} className="btn-wa px-10 py-5 text-lg shadow-2xl">
                Get Your Free Migration Audit
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="container max-w-4xl mx-auto px-6 py-20 pb-32">
          <div className="prose prose-invert prose-primary max-w-none prose-headings:italic prose-headings:font-black prose-p:text-text-muted prose-p:leading-relaxed prose-li:text-text-muted">
            <h2>Why Migrate Your Lovable Cloud App to Supabase?</h2>
            <p>
              Lovable Cloud is a fantastic tool for getting off the ground quickly. However, as your SaaS application grows, you may find that the proprietary backend creates a bottleneck for your scalability, security, and long-term costs. Moving to <strong>Supabase</strong> unlocks the full power of PostgreSQL, the world's most advanced open-source database.
            </p>
            <h3>The Benefits of Professional Migration</h3>
            <p>
              Migrating a live production app is a high-stakes operation. A single error in data transformation or authentication handling can lead to permanent data loss or locking users out of their accounts. Our <strong>Lovable to Supabase migration service</strong> is designed to mitigate these risks entirely.
            </p>
            <ul>
              <li><strong>Zero Data Loss:</strong> We use rigorous integrity checks to ensure every row is moved safely.</li>
              <li><strong>Auth Integrity:</strong> Your users won't even know the backend changed. We migrate all sessions and providers.</li>
              <li><strong>Full Control:</strong> Say goodbye to vendor lock-in and hello to raw SQL power.</li>
              <li><strong>Cost Optimization:</strong> Supabase offers predictable, lower-cost infrastructure at scale.</li>
            </ul>

            <h2>The Migration Roadmap: Move Lovable App to Supabase</h2>
            <p>
              Our process is divided into four distinct phases to ensure stability and performance throughout the move.
            </p>
            <h3>1. Deep Audit & Schema Design</h3>
            <p>
              We start by mapping your existing Lovable Cloud database. Since Supabase is built on standards-based PostgreSQL, we often optimize your schema during the move to improve query speeds and developer experience.
            </p>
            <h3>2. Secure Data Export & Import</h3>
            <p>
              Using custom scripts, we <strong>export Lovable database</strong> content and transform it for Supabase. This includes handling complex relationships, JSONB fields, and file storage links.
            </p>
            <h3>3. Authentication & Storage Mapping</h3>
            <p>
              We migrate your user base to Supabase Auth (GoTrue). We also move your files to Supabase Storage, updating every reference inside your database to point to the new, faster global CDN.
            </p>
            <h3>4. Client Library Integration</h3>
            <p>
              Finally, we update your frontend to use the Supabase SDK. We regenerate Typescript types for your new database, providing you with a superior developer experience (DX).
            </p>

            <h2>Ready to Scale Your Infrastructure?</h2>
            <p>
              Don't let your backend infrastructure be the reason your growth stalls. Join the dozens of founders who have successfully used our <strong>Lovable migration service</strong> to stabilize and scale their startups.
            </p>
          </div>

          {/* CTA Banner */}
          <div className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-white/5 opacity-50" />
            <h2 className="text-3xl font-black text-black italic mb-6 relative z-10">Start Your Lovable to Supabase Migration Today</h2>
            <p className="text-black/80 font-bold mb-10 text-lg relative z-10 max-w-2xl mx-auto">
              Get a professional roadmap and a fixed-price quote within 24 hours. No hidden fees, just pure engineering excellence.
            </p>
            <a href={WA_LINK} className="inline-flex items-center gap-3 font-black text-sm uppercase tracking-widest px-10 py-5 rounded-2xl bg-black text-white hover:bg-black/80 transition-all shadow-2xl relative z-10 group">
              Speak With A Migration Expert
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="mt-20 text-center">
             <Link href="/blog" className="text-primary hover:text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all">
                <ArrowRight size={14} /> View All Migration Resources
             </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
