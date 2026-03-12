import { Database, Globe, TrendingUp, DollarSign, Code, ShieldCheck } from "lucide-react";

const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const benefits = [
  {
    icon: <Database size={22} />,
    title: "Full PostgreSQL Control",
    description: "Every PostgreSQL feature at your fingertips — complex joins, triggers, stored procedures, views, and advanced indexing. Your database, your rules.",
  },
  {
    icon: <Globe size={22} />,
    title: "Open-Source Freedom",
    description: "No vendor lock-in, ever. Supabase is 100% open-source, so you own your infrastructure and can self-host if needed.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Scales With You",
    description: "From 100 to 10 million users without rewrites. Supabase is built for production-grade scale from day one.",
  },
  {
    icon: <DollarSign size={22} />,
    title: "Lower Long-Term Costs",
    description: "Predictable pricing with a generous free tier. Most apps save 40–60% on infrastructure costs after migrating.",
  },
  {
    icon: <Code size={22} />,
    title: "Developer-Friendly APIs",
    description: "Auto-generated REST and GraphQL APIs, real-time subscriptions, and official client libraries for every framework.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Enterprise Security",
    description: "Row Level Security, JWT auth, SSL everywhere, and SOC 2 compliance. Security built into every layer by default.",
  },
];

export default function Benefits() {
  return (
    <section className="section-padding bg-surface/30">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="pill mb-4">Benefits</span>
          <h2 className="h2 mb-4">
            Future-Proof Your App<br />
            <span className="primary-gradient-text italic">With Enterprise Scalability</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Experience the freedom of owning your backend. Better performance, lower costs, and total control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map(b => (
            <div key={b.title} className="glass-card group hover:bg-primary/[0.02]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h3 className="text-lg font-black text-white mb-3 tracking-tight">{b.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="glass-card !p-10 flex flex-col md:flex-row items-center justify-between gap-10 bg-black/40 border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-2xl font-black text-white mb-3">Professional Migration Service</h4>
            <p className="text-text-muted text-base max-w-xl">
              Get a comprehensive migration plan tailored to your app's complexity. We handle the heavy lifting while you focus on shipping features.
            </p>
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa px-10 py-4 text-basis shadow-xl relative z-10"
          >
            <WaIcon />
            Get Free Consultation
          </a>
        </div>

      </div>
    </section>
  );
}
