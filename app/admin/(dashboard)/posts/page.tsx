import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  return data || [];
}

export default async function ManagePostsPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="h2 italic mb-2">Content <span className="text-primary">Intelligence</span></h1>
          <p className="text-text-muted text-sm font-black uppercase tracking-widest leading-none">Resource Nodes Management</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary py-4 px-8 text-sm shadow-xl self-start md:self-auto">
          <Plus size={18} /> Deploy New Article
        </Link>
      </div>

      {/* Filters/Search Area */}
      <div className="glass-card !p-4 border-white/5 bg-surface/30 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle" />
          <input 
            type="text" 
            placeholder="Search within intelligence network..." 
            className="f-input pl-12 bg-black/20"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select className="f-input bg-black/20 text-sm py-3 min-w-[150px]">
            <option>All Categories</option>
            <option>Migration Guide</option>
            <option>Security</option>
            <option>Technical</option>
          </select>
          <select className="f-input bg-black/20 text-sm py-3 min-w-[150px]">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="glass-card !p-8 border-white/5 bg-surface/30 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-text-subtle">Article Details</th>
                <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-text-subtle">Category</th>
                <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-text-subtle">Status</th>
                <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-text-subtle text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.map((post: any) => (
                <tr key={post.id} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-12 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-text-subtle overflow-hidden relative">
                         {post.featured_image ? (
                           <img src={post.featured_image} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                         ) : (
                           <FileText size={20} />
                         )}
                      </div>
                      <div className="max-w-md">
                        <p className="text-sm font-black text-white italic group-hover:text-primary transition-colors line-clamp-1 mb-1">{post.title}</p>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-text-subtle">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.published_at).toLocaleDateString()}</span>
                          <span className="w-1 h-1 bg-white/10 rounded-full" />
                          <span>{post.read_time}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${post.published ? 'bg-primary' : 'bg-yellow-500'} shadow-[0_0_8px_rgba(62,207,142,0.4)]`} />
                       <span className="text-[10px] font-black uppercase tracking-widest">
                         {post.published ? 'Deployed' : 'Draft Node'}
                       </span>
                    </div>
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 text-text-subtle hover:text-primary transition-all">
                        <Eye size={16} />
                      </Link>
                      <Link href={`/admin/posts/edit/${post.id}`} className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 text-text-subtle hover:text-primary transition-all">
                        <Edit size={16} />
                      </Link>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-text-subtle hover:text-red-500 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                   <td colSpan={4} className="py-20 text-center text-text-muted italic">No intelligence nodes found in the database. Deploy your first article.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
           <p className="text-[10px] font-black uppercase tracking-widest text-text-subtle">Showing <span className="text-white">{posts.length}</span> nodes</p>
           <div className="flex gap-2">
              <button className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-text-subtle opacity-50 cursor-not-allowed">Previous Node</button>
              <button className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-text-subtle opacity-50 cursor-not-allowed">Next Node</button>
           </div>
        </div>
      </div>
    </div>
  );
}
