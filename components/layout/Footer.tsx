import Link from "next/link";

const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

import Image from "next/image";

const LovableLogo = ({ size = 20 }) => (
  <Image 
    src="/favicon.ico" 
    alt="Lovable Logo" 
    width={size} 
    height={size} 
    className="rounded-sm"
  />
);

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-white/5 py-20 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">

          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black shadow-[0_0_20px_rgba(62,207,142,0.4)] group-hover:rotate-12 transition-transform">
                <LovableLogo />
              </div>
              <span className="font-black text-white text-xl tracking-tighter uppercase">Lovable <span className="text-text-muted font-normal mx-1">→</span> Supabase</span>
            </div>
            <p className="text-text-muted text-base leading-relaxed mb-10 max-w-sm">
              The premier migration service for high-growth SaaS applications. We transition your tech stack from vendor lock-in to open-source excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa px-6 py-3 text-sm shadow-xl"
              >
                <WaIcon />
                Chat With Engineering
              </a>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Available Now</span>
              </div>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-white/30">Services</h4>
              <ul className="space-y-4">
                {[
                  "Database Migration",
                  "Auth Providers",
                  "API Restructuring",
                  "Storage Migration",
                  "RLS Implementation"
                ].map(s => (
                  <li key={s}>
                    <a href="/#services" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-white/30">Company</h4>
              <ul className="space-y-4">
                <li><a href="/#process" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="/#pricing" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="/#faq" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">FAQ</a></li>
                <li><Link href="/blog" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">Migration Blog</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-white/30">Get Started</h4>
              <p className="text-xs text-text-muted mb-4 leading-relaxed font-semibold italic">Ready to break free?</p>
              <a href={WA} className="text-sm font-black text-primary hover:text-white transition-colors flex items-center gap-2 group">
                Request Free Audit 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
          <p className="text-[11px] font-bold text-text-subtle uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Lovable to Supabase Migration Service. <br className="sm:hidden" />
            <span className="hidden sm:inline">·</span> Not affiliated with Lovable or Supabase.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-bold text-text-subtle uppercase tracking-widest">Pricing From <span className="text-primary">$300</span></span>
            <div className="h-4 w-[1px] bg-white/10" />
            <a href={WA} className="text-[11px] font-bold text-text-subtle hover:text-white transition-colors uppercase tracking-widest">WhatsApp Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
