import { Database, Lock, Plug, Rocket, HardDrive, TestTube, Cloud, Server, TrendingDown } from "lucide-react";

const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const services = [
  {
    icon: <Database size={22} />,
    title: "Database Migration",
    description: "Full export of tables, relationships, and data from Lovable Cloud. Clean PostgreSQL import with integrity validation.",
    items: ["Schema migration","Full data export","FK relationships","Index optimization"],
  },
  {
    icon: <Rocket size={22} />,
    title: "Supabase Project Setup",
    description: "Complete Supabase configuration — RLS, API keys, environment variables, and performance tuning from scratch.",
    items: ["RLS policies","Auth configuration","API setup","Performance tuning"],
  },
  {
    icon: <Lock size={22} />,
    title: "Authentication Migration",
    description: "Migrate all user accounts and auth providers to Supabase Auth with zero disruption to your users.",
    items: ["User migration","Social auth setup","Magic links","Session handling"],
  },
  {
    icon: <Plug size={22} />,
    title: "API Connection Updates",
    description: "Swap Lovable Cloud APIs for Supabase client libraries across your frontend and backend.",
    items: ["Frontend updates","SDK integration","Type generation","Error handling"],
  },
  {
    icon: <HardDrive size={22} />,
    title: "File Storage Migration",
    description: "Move all uploaded files and media to Supabase Storage with global CDN delivery and access policies.",
    items: ["File transfer","URL updates","CDN setup","Access policies"],
  },
  {
    icon: <TestTube size={22} />,
    title: "Testing & Deployment",
    description: "End-to-end testing, performance benchmarking, and zero-downtime production deployment with rollback plan.",
    items: ["E2E testing","Performance checks","Zero-downtime deploy","Rollback plan"],
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-bg relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] translate-x-1/2 pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="pill mb-4">Migration Services</span>
          <h2 className="h2 mb-4">
            Professional <span className="primary-gradient-text italic">Lovable Migration</span> Service
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            We handle every technical detail of your <strong>Lovable Cloud to Supabase migration</strong>, from secure data exports to production-ready API setup.{" "}
            After migration, choose between <strong className="text-white">Supabase Cloud</strong> or deploying Supabase on your own servers for maximum control.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map(s => (
            <div key={s.title} className="glass-card flex flex-col group hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="text-lg font-black text-white mb-3 tracking-tight">{s.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-6">{s.description}</p>
              <ul className="mt-auto space-y-3 pt-6 border-t border-white/5">
                {s.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-white/70 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Deployment Options ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="pill mb-4">Backend Deployment</span>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight">
              Choose Your <span className="primary-gradient-text italic">Supabase Deployment</span>
            </h3>
            <p className="text-text-muted max-w-xl mx-auto">
              After migration, we deploy Supabase exactly where you need it — managed cloud or full ownership on your servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Option 1 — Supabase Cloud */}
            <div className="glass-card flex flex-col gap-5 group hover:border-primary/40 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <Cloud size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border text-primary bg-primary/10 border-primary/20">
                  Quick Start
                </span>
              </div>
              <div>
                <h4 className="text-xl font-black text-white tracking-tight">Supabase Cloud</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-subtle mt-0.5">Official Hosted Platform</p>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                Fully managed infrastructure hosted by Supabase. Get your migrated project running in minutes with automatic backups, scaling, and zero server maintenance.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-white/5 mt-auto">
                {["Fully managed infrastructure", "Automatic backups & scaling", "Quick setup — no DevOps needed", "Ideal for startups & MVPs"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-white/70 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Option 2 — Self-Hosted */}
            <div className="glass-card flex flex-col gap-5 group hover:border-amber-400/40 transition-all duration-300 border-amber-400/10">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
                  <Server size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border text-amber-400 bg-amber-400/10 border-amber-400/20">
                  Maximum Control
                </span>
              </div>
              <div>
                <h4 className="text-xl font-black text-white tracking-tight">Self-Hosted Supabase</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-subtle mt-0.5">Deploy on Your Own Servers</p>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                Deploy the full Supabase stack on your own VPS or cloud servers. Full infrastructure ownership, complete data sovereignty, and significant long-term cost savings.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-white/5 mt-auto">
                {["Deploy on any VPS or cloud", "Full infrastructure control", "Significant long-term cost savings", "Ideal for high-traffic applications"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-white/70 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 group-hover:bg-amber-400 transition-colors flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cost benefit note */}
          <div className="glass-card !p-6 border-amber-400/10 bg-amber-400/5 flex items-start gap-4 hover:border-amber-400/20 hover:translate-y-0">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
              <TrendingDown size={20} />
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              <span className="text-white font-black">Cost Savings with Self-Hosted: </span>
              Many growing applications choose self-hosted Supabase to{" "}
              <span className="text-amber-400 font-bold">significantly reduce backend costs</span>{" "}
              while maintaining full control over their infrastructure.{" "}
              Not sure which is right for you?{" "}
              <a href={WA} target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                Ask us for free advice →
              </a>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm mb-8 text-text-muted font-medium">
            Not sure where to start? We offer a <span className="text-primary font-bold">100% Free Audit</span> of your current Lovable setup.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa px-12 py-5 text-lg shadow-2xl">
            <WaIcon />
            Discuss Your Migration on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
