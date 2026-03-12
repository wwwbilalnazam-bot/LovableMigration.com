const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

const WaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const steps = [
  {
    n: "01",
    day: "Day 1 — Free",
    title: "Free Project Audit",
    description: "We analyze your Lovable Cloud project: database size, auth setup, API dependencies, file storage, and integrations. You get a detailed migration plan at zero cost.",
    items: ["Schema review","Auth flow mapping","API analysis","Risk assessment"],
  },
  {
    n: "02",
    day: "Day 1–2",
    title: "Data Export & Backup",
    description: "Secure export of all your data from Lovable Cloud. Multiple backups created before any migration begins. Nothing is touched until you approve the plan.",
    items: ["Full DB backup","User data export","File storage backup","Schema docs"],
  },
  {
    n: "03",
    day: "Day 2–4",
    title: "Supabase Backend Setup",
    description: "We build your Supabase project: importing schema, configuring RLS, setting up auth providers, and creating storage buckets — production-ready from day one.",
    items: ["Schema import","RLS policies","Auth providers","Storage buckets"],
  },
  {
    n: "04",
    day: "Day 4–7",
    title: "Testing & Deployment",
    description: "End-to-end testing of all features before going live. Zero-downtime production deployment with a full rollback option. Your app gets 7 days of post-launch monitoring.",
    items: ["E2E testing","Performance benchmarks","Zero-downtime deploy","7-day monitoring"],
  },
];

export default function Process() {
  return (
    <section id="process" className="section-padding bg-bg">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="pill mb-4">How It Works</span>
          <h2 className="h2 mb-4">
            Your App Migrated in<br />
            <span className="primary-gradient-text italic">3–7 Days</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-lg leading-relaxed">
            A proven, seamless 4-step process. We handle the technical complexity while you stay informed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map(s => (
            <div
              key={s.n}
              className="glass-card flex gap-6 group hover:border-primary/40 transition-all duration-300"
            >
              {/* Number circle */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl group-hover:bg-primary group-hover:text-black transition-all">
                  {s.n}
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="inline-block text-[10px] font-black uppercase tracking-widest text-primary mb-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  {s.day}
                </span>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {s.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {s.items.map(item => (
                    <div key={item} className="flex items-center gap-2 text-[11px] font-bold text-text-subtle group-hover:text-white/60 transition-colors uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm font-bold text-text-muted mb-8 italic uppercase tracking-widest">
            The first step costs nothing.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa px-12 py-5 text-lg shadow-[0_0_50px_rgba(37,211,102,0.2)] hover:shadow-[0_0_60px_rgba(37,211,102,0.4)]">
            <WaIcon />
            Start My Free Audit
          </a>
        </div>

      </div>
    </section>
  );
}
