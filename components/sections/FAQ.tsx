"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20have%20a%20question%20about%20Lovable%20to%20Supabase%20migration";

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const faqs = [
  {
    q: "How long does Lovable to Supabase migration take?",
    a: "Most migrations complete in 3–7 business days. Simple MVPs can be done in 3 days. Larger production apps with complex auth, storage, and APIs typically take 5–7 days. We give you a precise timeline after the free project audit.",
  },
  {
    q: "Is Supabase better than Lovable Cloud for my app?",
    a: "For most production SaaS apps — yes. Supabase gives you full PostgreSQL control, 20+ auth providers, real-time, open-source architecture, and predictable pricing. If you're hitting Lovable Cloud limitations, Supabase is the right long-term move.",
  },
  {
    q: "Will my data be safe during migration?",
    a: "Absolutely. We create multiple backups before touching anything. We also run Supabase in parallel before switching traffic, ensuring zero data loss. A full rollback option remains available throughout the entire process.",
  },
  {
    q: "Can you migrate authentication and all user accounts?",
    a: "Yes. We handle full auth migration — email/password, Google, GitHub, magic links, and custom auth flows. Existing user accounts are migrated to Supabase Auth with no impact on your users.",
  },
  {
    q: "Do you support large SaaS apps with thousands of users?",
    a: "Yes. We've migrated apps with 50k+ users. For larger apps we use parallel running, blue-green deployment, and gradual traffic shifting to ensure zero downtime and full data consistency.",
  },
  {
    q: "What if something goes wrong after migration?",
    a: "We maintain complete backups and a tested rollback plan for every project. If any issue arises post-launch, we fix it immediately. Our 7-day post-migration monitoring is included in every plan.",
  },
  {
    q: "How do I get started?",
    a: "The easiest way is to message us on WhatsApp. Share your project link or describe your app and we'll reply with a free assessment and migration plan — usually within minutes.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />

      <div className="container max-w-3xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <span className="pill mb-4">FAQ</span>
          <h2 className="h2 mb-4">
            Got Questions?<br />
            <span className="primary-gradient-text italic">We've Got Answers</span>
          </h2>
          <p className="text-text-muted text-lg">
            Everything you need to know about the migration process and what to expect.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`glass-card !p-0 border-white/5 overflow-hidden transition-all duration-300 ${open === i ? "border-primary/30 bg-primary/[0.02]" : "hover:border-white/10"}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`text-base font-bold transition-colors ${open === i ? "text-primary" : "text-white/80 group-hover:text-white"}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open === i ? "bg-primary text-black rotate-180" : "bg-white/5 text-primary group-hover:bg-primary/20"}`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-6 text-text-muted text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ CTA */}
        <div className="!p-10 text-center bg-surface/50 border border-primary/10 rounded-3xl relative group overflow-hidden shadow-xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <h4 className="text-xl font-black text-white mb-2">Still have questions?</h4>
            <p className="text-text-muted text-sm mb-8 max-w-md mx-auto">
              Our experts are online and ready to help. Get a fast, human response on WhatsApp.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa px-12 py-4">
              <WaIcon />
              Chat With An Expert
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
