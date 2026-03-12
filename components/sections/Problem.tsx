import { Lock, TrendingDown, AlertTriangle, Code2 } from "lucide-react";

const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const problems = [
  {
    icon: <Lock size={22} />,
    title: "Vendor Lock-In",
    description: "Lovable Cloud's proprietary backend traps your data, auth, and APIs in their ecosystem. Growing riskier every day you stay.",
  },
  {
    icon: <TrendingDown size={22} />,
    title: "Scaling Bottlenecks",
    description: "Slow queries, API rate limits, and infrastructure constraints cap your growth. Lovable Cloud simply wasn't built for serious scale.",
  },
  {
    icon: <AlertTriangle size={22} />,
    title: "Limited Backend Control",
    description: "No raw SQL access, no stored procedures, no Row Level Security. You're constantly working around the platform instead of with it.",
  },
  {
    icon: <Code2 size={22} />,
    title: "Closed-Source Risk",
    description: "When Lovable Cloud changes pricing or sunsets features, you have zero alternatives. Closed source means zero visibility.",
  },
];

import Image from "next/image";

const LovableLogo = ({ size = 20 }) => (
  <Image 
    src="/favicon.ico" 
    alt="Lovable Logo" 
    width={size} 
    height={size} 
    className="rounded-sm shadow-lg"
  />
);

export default function Problem() {
  return (
    <section className="section-padding bg-surface/50 border-y border-border/50">
      <div className="container max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <span className="pill mb-4">The Problem</span>
          <h2 className="h2 mb-4 flex flex-col items-center gap-2">
            <span className="flex items-center gap-3">
              <span className="text-primary"><LovableLogo size={32} /></span>
              Proprietary Backend
            </span>
            <span className="primary-gradient-text italic">Bottlenecks & Lock-in</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            A <strong>Lovable backend migration</strong> is essential for growing apps. Don't let your infrastructure become a limitation; move from Lovable Cloud to the open-source power of Supabase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {problems.map(p => (
            <div key={p.title} className="glass-card flex gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">{p.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote + WA CTA */}
        <div className="!p-0 grid grid-cols-1 md:grid-cols-3 border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="md:col-span-2 p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <p className="text-lg font-medium italic leading-relaxed mb-4 text-white relative z-10">
              &ldquo;I spent 3 months fighting Lovable Cloud limitations. After migrating to Supabase in 5 days, everything just worked. Zero data loss, total control. Wish I had done it sooner.&rdquo;
            </p>
            <p className="text-primary font-bold tracking-tight">
              — SaaS Founder, 50k+ Monthly Users
            </p>
          </div>
          <div className="flex items-center justify-center p-10 bg-black/40 border-l border-white/5">
            <div className="text-center">
              <p className="text-text-muted mb-6 text-[10px] font-black uppercase tracking-widest text-white/40">
                Break Free Today
              </p>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa shadow-2xl"
              >
                <WaIcon />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
