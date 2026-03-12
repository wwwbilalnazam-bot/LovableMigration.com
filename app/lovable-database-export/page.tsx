import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Link from "next/link";
import { Database, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Export Lovable Database Safely | Professional Migration Support",
  description: "Need to export your Lovable Cloud database? We provide professional data extraction, transformation, and import services for Supabase and Postgres.",
  keywords: "export lovable database, lovable cloud data export, extract lovable data, migration tools",
  alternates: { canonical: "https://lovablemigration.com/lovable-database-export" },
};

const WA_LINK = "https://wa.me/97470896755?text=Hi%2C%20I%20need%20help%20exporting%20my%20Lovable%20database";

export default function ServicePageTwo() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I export my Lovable database as raw SQL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we specialize in extracting your data and converting it into high-quality, normalized PostgreSQL SQL dumps that can be imported to Supabase or any other host."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data encrypted during the export process?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all data handling is done using encrypted tunnels and secure local environments to ensure your customer data is never exposed."
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
            <h1 className="h1 mb-6 uppercase tracking-tight">
              Export Your <span className="primary-gradient-text italic">Lovable Database</span> Safely
            </h1>
            <p className="text-text-muted text-xl mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              Don't leave your data trapped. We provide enterprise-grade extraction and transformation for Lovable Cloud projects of any size.
            </p>
            <div className="flex justify-center">
              <a href={WA_LINK} className="btn-wa shadow-2xl">
                Get a Secure Export Quote
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container max-w-4xl mx-auto px-6 py-20 pb-32">
          <div className="prose prose-invert prose-primary max-w-none prose-headings:italic prose-p:text-text-muted prose-li:text-text-muted">
            <h2>The Challenge of Exporting from Lovable Cloud</h2>
            <p>
              When you decide to move your application or simply create a local备份, you'll find that there is no "One-Click Export" button in Lovable Cloud that gives you a production-ready SQL dump. This is where our <strong>Lovable database export</strong> service comes in. 
            </p>
            <p>
              We don't just "scrape" data; we perform a deep architectural extraction that preserves:
            </p>
            <ul>
              <li><strong>Foreign Key Constraints:</strong> Maintaining the relational integrity of your data.</li>
              <li><strong>JSONB Structures:</strong> Ensuring nested metadata remains accessible.</li>
              <li><strong>Type Safely:</strong> Converting proprietary types into standard Postgres equivalents.</li>
              <li><strong>Auth Relationships:</strong> Linking user-owned data back to their original IDs.</li>
            </ul>

            <h3>Why a Clean Export is Critical for Migration</h3>
            <p>
              A messy export leads to a broken migration. If you're planning to <strong>move Lovable app to Supabase</strong>, the quality of your initial data dump is the single most important factor for success. Our team writes custom scripts for every client to handle the unique quirks of their specific database schema.
            </p>

            <h2>Our Data Export Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
               <div className="glass-card p-8 bg-surface/20">
                  <h4 className="text-primary font-black uppercase text-xs mb-4">Phase 1: Extraction</h4>
                  <p className="text-xs text-text-muted leading-relaxed">We use API-level mirroring to pull every object and record from your Lovable backend into a secure local staging area.</p>
               </div>
               <div className="glass-card p-8 bg-surface/20">
                  <h4 className="text-primary font-black uppercase text-xs mb-4">Phase 2: Normalization</h4>
                  <p className="text-xs text-text-muted leading-relaxed">We clean the data, fix inconsistencies, and transform it into a standard PostgreSQL format ready for Supabase.</p>
               </div>
            </div>

            <p>
               By choosing a professional <strong>Lovable migration service</strong>, you avoid the common pitfalls like character encoding issues, truncated JSON fields, and lost relational links that often plague DIY migration attempts.
            </p>
          </div>

          {/* CTA Banner */}
          <div className="mt-20 p-12 rounded-3xl bg-surface border border-primary/20 text-center relative overflow-hidden shadow-2xl">
            <h2 className="text-2xl font-black text-white italic mb-6">Need Your Data Now?</h2>
            <p className="text-text-muted font-bold mb-10 text-lg max-w-lg mx-auto">
              Our experts can perform an initial secure export of your Lovable database within 12 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <a href={WA_LINK} className="btn-wa shadow-2xl">
                 Order Secure Export
               </a>
               <Link href="/" className="btn-secondary">
                 Home
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
