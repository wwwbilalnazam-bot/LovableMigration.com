import { supabase } from "@/lib/supabase";
import { 
  Inbox, 
  Search, 
  Trash2, 
  Calendar,
  AtSign,
  Link as LinkIcon,
  MessageCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  return data || [];
}

export default async function ManageLeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="h2 italic mb-2">Lead <span className="text-secondary">Intelligence</span></h1>
        <p className="text-text-muted text-sm font-black uppercase tracking-widest leading-none">Inbound Acquisition Monitoring</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card !p-6 border-white/5 bg-surface/30">
          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Inquiries</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-white italic">{leads.length}</h3>
            <p className="text-[10px] font-bold text-secondary mb-1.5">All Time</p>
          </div>
        </div>
        <div className="glass-card !p-6 border-white/5 bg-surface/30">
          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-1">Unprocessed</p>
          <div className="flex items-end gap-3">
             <h3 className="text-3xl font-black text-yellow-500 italic">
               {leads.filter((l: any) => l.status === 'new').length}
             </h3>
             <p className="text-[10px] font-bold text-yellow-500 mb-1.5">Pending Action</p>
          </div>
        </div>
        <div className="glass-card !p-6 border-white/5 bg-surface/30">
          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-1">Response Latency</p>
          <div className="flex items-end gap-3">
             <h3 className="text-3xl font-black text-primary italic">~4.2h</h3>
             <p className="text-[10px] font-bold text-primary mb-1.5">Optimized</p>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {leads.map((lead: any) => (
          <div key={lead.id} className="glass-card !p-0 border-white/5 bg-surface/30 group hover:border-secondary/30 transition-all overflow-hidden">
            <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Profile Info */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary font-black border border-secondary/20">
                    {lead.first_name?.[0] || '?'}{lead.last_name?.[0] || ''}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white italic">{lead.first_name} {lead.last_name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-wider text-text-subtle flex items-center gap-2">
                       <Clock size={10} /> {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-text-muted hover:text-white transition-colors">
                    <AtSign size={14} className="text-secondary/60" />
                    {lead.email}
                  </div>
                  {lead.project_url && (
                    <a href={lead.project_url} target="_blank" className="flex items-center gap-3 text-xs text-secondary hover:underline">
                      <LinkIcon size={14} className="text-secondary/60" />
                      View Project
                    </a>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-6 bg-black/20 rounded-2xl p-6 border border-white/5 relative">
                <MessageCircle size={14} className="absolute top-4 right-4 text-white/10" />
                <p className="text-sm text-text-muted leading-relaxed italic">
                  "{lead.message || 'No additional project intelligence provided.'}"
                </p>
              </div>

              {/* Status & Actions */}
              <div className="lg:col-span-3 flex flex-col h-full justify-between items-end text-right">
                <div className="flex flex-col items-end gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                    lead.status === 'new' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-primary/10 text-primary border-primary/20'
                  }`}>
                    {lead.status}
                  </span>
                  <p className="text-[10px] font-bold text-text-subtle flex items-center gap-2">
                    Source: <span className="text-white">{lead.source}</span>
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button className="btn-secondary !py-2 !px-4 !text-[10px] !shadow-none">
                     Manage Status
                  </button>
                  <button className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Project Date Footer */}
            <div className="bg-white/[0.02] px-8 py-3 border-t border-white/5 flex justify-between items-center">
               <span className="text-[9px] font-black uppercase tracking-widest text-text-subtle flex items-center gap-2">
                 <Calendar size={12} className="text-secondary/40" />
                 Acquisition Date: {new Date(lead.created_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
               </span>
               <div className="flex gap-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-text-subtle">ID: {lead.id.slice(0, 8)}</span>
               </div>
            </div>
          </div>
        ))}
        
        {leads.length === 0 && (
          <div className="glass-card !p-20 text-center border-white/5 bg-surface/30">
            <Inbox size={48} className="mx-auto mb-6 text-white/10" />
            <h3 className="text-xl font-black text-white italic mb-2">No Leads Detected</h3>
            <p className="text-text-muted text-sm max-w-xs mx-auto">Your acquisition funnel is live, but no data has been captured yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
