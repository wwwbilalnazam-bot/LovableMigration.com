import Link from "next/link";
import { ArrowRight, Database, Shield, Zap, TrendingUp } from "lucide-react";

export default function SEOContent() {
  const links = [
    { title: "Lovable to Supabase Migration", href: "/lovable-to-supabase-migration" },
    { title: "Lovable Database Export", href: "/lovable-database-export" },
    { title: "Why Migrate From Lovable?", href: "/why-migrate-from-lovable" },
    { title: "Professional Migration Service", href: "/lovable-migration-service" },
  ];

  return (
    <section className="section-padding bg-bg relative overflow-hidden border-t border-white/5">
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h2 className="h2 mb-8 italic">
              Scale Your SaaS with <br />
              <span className="primary-gradient-text">Zero Vendor Lock-In</span>
            </h2>
            <div className="space-y-6 text-text-muted leading-relaxed">
              <p>
                In the fast-moving world of SaaS development, agility is everything. While builders like Lovable Cloud offer an incredible speed-to-market advantage for MVPs, the transition to a professional, open-source backend is a critical step for scalability. Our <strong>Lovable migration service</strong> is dedicated to helping founders make this move safely.
              </p>
              <p>
                When you <strong>move Lovable app to Supabase</strong>, you aren't just changing databases; you're upgrading your entire technical foundation. From <strong>exporting Lovable database</strong> content to mapping complex authentication flows, our team ensures that your infrastructure matches your growth ambitions.
              </p>
              <p>
                Our <strong>Lovable to Supabase experts</strong> have handled migrations for startups of all sizes, ensuring that mission-critical data remains secure and user sessions remain uninterrupted. Whether you're looking for better API performance or predictable 2025 hosting costs, we are here to help.
              </p>
            </div>
          </div>

          <div className="glass-card !p-8 border-primary/10 bg-primary/[0.02]">
            <h3 className="text-xl font-black text-white italic mb-6">Explore Our Migration Resources</h3>
            <div className="grid grid-cols-1 gap-4">
              {links.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/[0.08] transition-all group"
                >
                  <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{link.title}</span>
                  <ArrowRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-xs text-text-muted leading-relaxed">
                Looking for a custom solution? Our engineers can provide a deep technical audit of your Lovable Cloud project to build a custom migration roadmap. <strong>Export Lovable database</strong> safely today.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
