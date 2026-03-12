const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const testimonials = [
  {
    avatar: "AR",
    name: "Alex Rodriguez",
    role: "SaaS Founder · ProjectFlow",
    text: "Migrated our 50k-user app in 5 days with zero downtime. Our app loads 3x faster on Supabase. Absolutely incredible service.",
    rating: 5,
  },
  {
    avatar: "PS",
    name: "Priya Sharma",
    role: "Indie Hacker · TaskBuddy",
    text: "As a solo developer I couldn't have done this myself. They handled everything — even set up RLS policies I didn't know I needed.",
    rating: 5,
  },
  {
    avatar: "MC",
    name: "Marcus Chen",
    role: "Co-Founder · DevMetrics",
    text: "Went from $400/month on Lovable Cloud to $25/month on Supabase. The migration paid for itself in month one.",
    rating: 5,
  },
  {
    avatar: "SJ",
    name: "Sarah Johnson",
    role: "Startup Founder · ContentAI",
    text: "Auth migration was seamless. Our users didn't even notice the switch. Detailed post-migration docs included. 10/10.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-surface/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-glow opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <span className="pill mb-4">Success Stories</span>
          <h2 className="h2 mb-4">
            Trusted by Builders &<br />
            <span className="primary-gradient-text italic">Small to Large SaaS Founders</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-lg leading-relaxed">
            Real feedback from developers who broke free from vendor lock-in and scaled their apps on Supabase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map(t => (
            <div
              key={t.name}
              className="glass-card flex flex-col group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-8 text-white/90 italic font-medium relative italic">
                <span className="text-4xl absolute -top-4 -left-2 text-primary/20 leading-none">"</span>
                {t.text}
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(62,207,142,0.1)]">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-black text-white tracking-tight">{t.name}</p>
                  <p className="text-xs font-bold text-text-subtle uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats + CTA Row */}
        <div className="glass-card !p-0 grid grid-cols-1 md:grid-cols-5 border-primary/10 bg-black/40 shadow-2xl overflow-hidden">
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
            {[
              { v: "50+",      l: "Migrations" },
              { v: "100%",     l: "Success" },
              { v: "4.9/5",    l: "Rating" },
              { v: "< 7d",     l: "Turnaround" },
            ].map(s => (
              <div
                key={s.l}
                className="text-center py-10 px-4 group hover:bg-white/[0.02] transition-colors"
              >
                <p className="text-3xl font-black mb-1 primary-gradient-text italic">{s.v}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-subtle group-hover:text-primary transition-colors">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="md:col-span-2 flex flex-col items-center justify-center p-10 text-center gap-6 bg-primary/5 border-l border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-white font-black text-lg mb-2 tracking-tight italic">Ready to be our next success?</p>
              <p className="text-xs font-bold text-text-muted mb-6 uppercase tracking-widest">Free audit — No strings attached.</p>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa w-full py-4 text-sm shadow-xl"
              >
                <WaIcon />
                Start Free Consultation
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
