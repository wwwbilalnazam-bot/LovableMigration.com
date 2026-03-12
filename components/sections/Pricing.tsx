"use client";
import { CheckCircle2 } from "lucide-react";

const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const plans = [
  {
    name: "Basic",
    price: "$300",
    desc: "Small apps & MVPs",
    features: ["Database migration","Supabase project setup","Basic auth setup","Data integrity check","1 week support"],
    featured: false,
  },
  {
    name: "Standard",
    price: "$450",
    desc: "Growing SaaS apps",
    features: ["Everything in Basic","Full auth migration","API updates","Row Level Security","Frontend integration","2 weeks support"],
    featured: true,
    badge: "Popular",
  },
  {
    name: "Premium",
    price: "$600",
    desc: "Full-service production",
    features: ["Everything in Standard","File storage migration","E2E testing","Zero-downtime deploy","Rollback plan","1 month support"],
    featured: false,
  },
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

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-surface/50 border-y border-border/50">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="pill mb-4">Pricing</span>
          <h2 className="h2 mb-4">
            Simple, Transparent<br />
            <span className="primary-gradient-text italic">Investment for Your App</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-lg leading-relaxed">
            Professional migration services with fixed pricing. No hidden costs. 100% satisfaction guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map(p => (
            <div
              key={p.name}
              className={`glass-card flex flex-col items-center text-center group transition-all duration-500 ${
                p.featured ? "border-primary/40 bg-primary/[0.03] scale-105 shadow-[0_20px_50px_rgba(62,207,142,0.1)] z-10" : ""
              }`}
            >
              {p.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-black shadow-xl flex items-center gap-1.5">
                  <LovableLogo size={10} />
                  {p.badge}
                </div>
              )}

              <p className={`text-sm font-black uppercase tracking-[0.2em] mb-4 ${p.featured ? "text-primary" : "text-text-subtle"}`}>
                {p.name}
              </p>
              
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-black text-white italic">{p.price}</span>
                <span className="text-xs font-bold text-text-subtle uppercase tracking-widest">/ flat</span>
              </div>
              <p className="text-sm text-text-muted mb-8 italic">{p.desc}</p>

              <ul className="w-full space-y-4 mb-10 text-left border-y border-white/5 py-8">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <CheckCircle2 size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-semibold text-white/70">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`${WA}&text=Hi%2C%20I%27m%20interested%20in%20the%20${p.name}%20plan%20for%20${p.price}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-wa w-full py-4 text-sm shadow-xl ${!p.featured ? "!bg-white/5 !text-white !border-white/10 border hover:!bg-primary hover:!text-black" : ""}`}
              >
                <WaIcon />
                Order {p.name}
              </a>
            </div>
          ))}
        </div>

        <div className="glass-card !py-6 !px-8 text-center bg-white/5 border-white/5 inline-block left-1/2 -translate-x-1/2 relative">
          <p className="text-sm font-bold text-text-muted">
            Large enterprise migration?{" "}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline italic ml-1"
            >
              Contact us for a custom quote →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
