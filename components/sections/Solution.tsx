import { CheckCircle2 } from "lucide-react";

const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const features = [
  "Full PostgreSQL — unlimited query power",
  "Open-source — zero vendor lock-in, ever",
  "20+ authentication providers built in",
  "Real-time subscriptions from the database",
  "Row Level Security at the database layer",
  "Predictable, affordable pricing at scale",
  "Global CDN for file storage",
  "World-class docs & active community",
];

import Image from "next/image";

const LovableLogo = ({ size = 12 }) => (
  <Image 
    src="/favicon.ico" 
    alt="Lovable Logo" 
    width={size} 
    height={size} 
    className="rounded-sm"
  />
);

export default function Solution() {
  return (
    <section className="section-padding bg-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>
            <span className="pill mb-4">The Solution</span>
            <h2 className="h2 mb-6">
              Migrate Lovable App to <br />
              <span className="primary-gradient-text italic">Supabase Securely</span>
            </h2>
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              Supabase gives you everything Lovable Cloud can't. Our <strong>Lovable migration service</strong> provides full database control, real-time capabilities, and zero vendor lock-in with industry-standard PostgreSQL.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map(f => (
                <div key={f} className="flex items-start gap-3 group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa px-8">
                <WaIcon /> Start Migration
              </a>
              <a href="/#services" className="btn-secondary px-8">Explore Services</a>
            </div>
          </div>

          {/* RIGHT — Comparison card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="glass-card relative !p-8 border-primary/20">
              <h3 className="text-center font-black text-xs uppercase tracking-[0.2em] mb-8 text-text-subtle">
                Infrastructure Comparison
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Before */}
                <div className="rounded-2xl p-5 bg-white/5 border border-white/5">
                  <div className="flex items-center justify-center gap-2 mb-5 px-3 py-1 rounded-full text-text-muted bg-white/5">
                    <LovableLogo />
                    <span className="text-[10px] font-black uppercase tracking-widest">Lovable</span>
                  </div>
                  {["Proprietary DB","Basic Auth Only","No Raw SQL","Vendor Lock-in","Opaque Costs"].map(item => (
                    <div key={item} className="flex items-center gap-2 text-[11px] font-bold mb-4 text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* After */}
                <div className="rounded-2xl p-5 bg-primary/5 border border-primary/20 ring-1 ring-primary/20">
                  <p className="text-center text-[10px] font-black uppercase tracking-widest mb-5 px-3 py-1 rounded-full text-primary bg-primary/10">
                    Supabase ✓
                  </p>
                  {["Full PostgreSQL","20+ Providers","Unlimited SQL","Open Source","Predictable"].map(item => (
                    <div key={item} className="flex items-center gap-2 text-[11px] font-bold mb-4 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(62,207,142,0.8)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WA CTA inside card */}
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa w-full py-4 text-sm"
              >
                <WaIcon /> Free Migration Assessment
              </a>
            </div>

            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest bg-primary text-black shadow-2xl animate-bounce">
              Official Experts
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
