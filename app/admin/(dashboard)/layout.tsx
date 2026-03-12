import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Home,
  MessageSquare,
  Globe
} from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <BarChart3 size={18} /> },
  { href: "/admin/posts", label: "Blog Posts", icon: <FileText size={18} /> },
  { href: "/admin/leads", label: "Client Inquiries", icon: <MessageSquare size={18} /> },
  { href: "/admin/analytics", label: "Advanced Insights", icon: <Globe size={18} /> },
  { href: "/admin/settings", label: "Operational Config", icon: <Settings size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-white flex">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-surface/20 flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="p-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(62,207,142,0.45)] group-hover:scale-110 transition-transform">
              LM
            </div>
            <div>
              <p className="text-sm font-black italic tracking-tight group-hover:text-primary transition-colors">LovableMigration</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-text-subtle">Admin Intelligence</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-subtle mb-6 mt-4">Security Hub</p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-4 rounded-xl text-text-muted hover:text-white hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
            >
              <span className="text-text-subtle group-hover:text-primary transition-colors">
                {item.icon}
              </span>
              <span className="text-sm font-bold">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <div className="glass-card bg-primary/5 border-primary/20 p-5 rounded-2xl mb-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(62,207,142,0.8)]" />
              <span className="text-xs font-bold italic">Node Online & Optimized</span>
            </div>
          </div>
          
          <Link 
            href="/admin/login" 
            className="flex items-center gap-4 px-4 py-4 rounded-xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all group border border-transparent hover:border-red-500/10"
          >
            <LogOut size={18} />
            <span className="text-sm font-black italic">Terminate Session</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col relative overflow-y-auto h-screen no-scrollbar">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 w-full h-20 bg-bg/80 backdrop-blur-xl border-b border-white/5 px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="lg:hidden w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black font-black">LM</div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-subtle hidden sm:block">
               Authenticated as <span className="text-white">Central Admin</span> / Access Node 01
             </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors flex items-center gap-2">
              <Home size={14} /> Live Platform
            </Link>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 p-1">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
