import { supabase } from "@/lib/supabase";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  ArrowUpRight, 
  TrendingUp,
  Inbox
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true });

  const { data: recentLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    postsCount: postsCount || 0,
    leadsCount: leadsCount || 0,
    recentLeads: recentLeads || []
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { title: "Total Articles", value: stats.postsCount, icon: <FileText className="text-primary" />, trend: "+2 this week" },
    { title: "Total Leads", value: stats.leadsCount, icon: <Inbox className="text-secondary" />, trend: "+12% vs last month" },
    { title: "Conversion Rate", value: "4.8%", icon: <TrendingUp className="text-accent" />, trend: "+0.5% growth" },
    { title: "Active Projects", value: "7", icon: <Users className="text-white" />, trend: "3 in queue" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="h2 italic mb-2">Command <span className="text-primary">Intelligence</span></h1>
        <p className="text-text-muted text-sm font-black uppercase tracking-widest leading-none">Global Infrastructure Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="glass-card !p-6 border-white/5 bg-surface/30 group hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                Live
              </span>
            </div>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-1">{card.title}</p>
            <div className="flex items-end gap-3">
              <h3 className="text-3xl font-black text-white italic">{card.value}</h3>
              <p className="text-[10px] font-bold text-primary mb-1.5">{card.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads */}
        <div className="lg:col-span-2 glass-card !p-8 border-white/5 bg-surface/30">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-black italic text-white underline decoration-primary/30 underline-offset-8 decoration-4">
              Recent Inquiries
            </h3>
            <Link href="/admin/leads" className="text-[10px] font-black uppercase tracking-widest text-text-subtle hover:text-primary transition-colors">
              View All Intelligence
            </Link>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-text-subtle">Name</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-text-subtle">Email</th>
                  <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-text-subtle">Status</th>
                  <th className="pb-4 text-right text-[10px] font-black uppercase tracking-widest text-text-subtle">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="group transition-colors hover:bg-white/[0.02]">
                    <td className="py-5 text-sm font-bold text-white group-hover:text-primary transition-colors">
                      {lead.first_name} {lead.last_name}
                    </td>
                    <td className="py-5 text-sm text-text-muted">{lead.email}</td>
                    <td className="py-5">
                      <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <button className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 hover:text-primary transition-all">
                        <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {stats.recentLeads.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-text-muted italic">No recent inquiries to display.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card !p-8 border-white/5 bg-surface/30 flex flex-col">
          <h3 className="text-lg font-black italic text-white mb-8">
            Operational Hub
          </h3>
          <div className="space-y-4">
            <Link href="/admin/posts/new" className="flex items-center justify-between p-5 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all group">
              <div className="flex items-center gap-4">
                <FileText className="text-primary" />
                <span className="text-sm font-black italic text-white">Create New Article</span>
              </div>
              <ArrowUpRight size={18} className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            
            <Link href="/admin/posts" className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
              <div className="flex items-center gap-4">
                <Settings className="text-text-muted" />
                <span className="text-sm font-bold text-white">Manage Content</span>
              </div>
              <ArrowUpRight size={18} className="text-text-muted group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </Link>

            <Link href="/admin/settings" className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
              <div className="flex items-center gap-4">
                <Users className="text-text-muted" />
                <span className="text-sm font-bold text-white">System Config</span>
              </div>
              <ArrowUpRight size={18} className="text-text-muted group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </Link>
          </div>

          <div className="mt-auto pt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-subtle mb-4">Database Health</p>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[94%] bg-primary shadow-[0_0_10px_rgba(62,207,142,0.8)]" />
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-bold uppercase tracking-widest">
              <span className="text-primary">Optimized</span>
              <span className="text-text-subtle">94% Latency Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
