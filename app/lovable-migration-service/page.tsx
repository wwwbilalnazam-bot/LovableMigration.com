import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Lovable Migration Service for SaaS Founders",
  description: "Get a dedicated engineer to migrate your Lovable Cloud app to Supabase. Secure, fast, and 100% data integrity guaranteed.",
  keywords: "lovable migration service, lovable cloud to supabase, expert migration, saas development",
  alternates: { canonical: "https://lovablemigration.com/lovable-migration-service" },
};

const WA_LINK = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20hire%20you%20for%20a%20Lovable%20migration%20project";

export default function ServicePageFour() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is included in the migration service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our service includes database schema mapping, data extraction, auth provider migration, storage move, and updating your client libraries to use Supabase."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide post-migration support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, every project includes 14 days of priority monitoring and support to ensure your new backend is running perfectly."
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
                Premium <span className="primary-gradient-text italic">Lovable Migration</span> Service
                </h1>
                <p className="text-text-muted text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                Stop worrying about migration complexity. Our dedicated engineers handle the entire move from Lovable Cloud to Supabase for you.
                </p>
                <div className="flex justify-center">
                    <a href={WA_LINK} className="btn-wa shadow-2xl">
                        Schedule Your Migration Quote
                    </a>
                </div>
            </div>
        </section>

        {/* Content Section */}
        <section className="container max-w-4xl mx-auto px-6 py-20 pb-32">
            <div className="prose prose-invert prose-primary max-w-none prose-headings:italic prose-p:text-text-muted prose-li:text-text-muted">
                <h2>Why Choose Our Lovable Migration Service?</h2>
                <p>
                    Building your application was hard enough. Migrating its entire core shouldn't be. Our <strong>Lovable migration service</strong> takes the technical burden off your shoulders, allowing you to focus on shipping features and acquiring customers.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                    <div className="p-8 rounded-3xl bg-surface/50 border border-white/5 flex flex-col gap-4">
                        <ShieldCheck className="text-primary" size={32} />
                        <h4 className="text-white font-black italic text-lg tracking-tight">Guaranteed Data Integrity</h4>
                        <p className="text-sm">We use automated validation tools to ensure every single record in your Lovable backend is perfectly mirrored in Supabase.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-surface/50 border border-white/5 flex flex-col gap-4">
                        <Zap className="text-primary" size={32} />
                        <h4 className="text-white font-black italic text-lg tracking-tight">Rapid Turnaround</h4>
                        <p className="text-sm">Most migrations are completed in under 5 business days. We move fast so you can get back to building.</p>
                    </div>
                </div>

                <h3>What's Included in Every Project?</h3>
                <p>
                    Our <strong>Lovable Cloud to Supabase migration</strong> is a comprehensive, white-glove service. We don't just hand you a SQL file; we ensure your entire app is operational in the new environment.
                </p>
                <ul>
                    <li><strong>Full Database Extraction:</strong> Clean, sanitized SQL dumps.</li>
                    <li><strong>Auth Provider Mapping:</strong> Keeping your users logged in.</li>
                    <li><strong>Storage Bucket Mirroring:</strong> Moving assets to the global CDN.</li>
                    <li><strong>Environment Configuration:</strong> Managing your secrets and keys.</li>
                    <li><strong>SDK Transformation:</strong> Helper scripts for frontend updates.</li>
                </ul>

                <h2>Cost-Effective Expertise for Startups</h2>
                <p>
                    We understand startup budgets. Our <strong>Lovable to Supabase experts</strong> work on a fixed-fee basis, starting at just $300. This is an investment in your app's future scalability and developer freedom.
                </p>

                <h3>Post-Migration Peace of Mind</h3>
                <p>
                    Every migration we perform comes with a 14-day warranty. If you encounter any bugs related to the backend move, we fix them within 2 hours. That's our commitment to quality.
                </p>
            </div>

            {/* CTA Banner */}
            <div className="mt-20 p-12 rounded-3xl bg-surface border border-primary/20 text-center relative overflow-hidden shadow-2xl">
                <h2 className="text-2xl font-black text-white italic mb-6">Ready to Move to Supabase?</h2>
                <p className="text-text-muted font-bold mb-10 text-lg max-w-lg mx-auto">
                    Join the 50+ founders who trust us with their infrastructure. Zero loss, full control.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href={WA_LINK} className="btn-wa shadow-2xl px-12 py-5 font-black text-xs uppercase tracking-widest">
                        Book Migration Call
                    </a>
                    <Link href="/lovable-to-supabase-migration" className="btn-secondary px-12 py-5 font-black text-xs uppercase tracking-widest">
                        Learn More
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
