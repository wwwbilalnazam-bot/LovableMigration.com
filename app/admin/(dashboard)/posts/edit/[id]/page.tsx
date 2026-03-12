"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Globe, 
  Plus, 
  Trash2,
  AlertCircle,
  HelpCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    meta_title: "",
    meta_description: "",
    keywords: "",
    category: "",
    tags: [] as string[],
    featured_image: "",
    author: "",
    read_time: "",
    published: false,
    faqs: [] as { q: string, a: string }[]
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || "",
          content: data.content,
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          keywords: data.keywords || "",
          category: data.category || "Migration Guide",
          tags: data.tags || [],
          featured_image: data.featured_image || "",
          author: data.author || "Migration Expert",
          read_time: data.read_time || "10 min read",
          published: data.published,
          faqs: data.faqs || []
        });
      } catch (err: any) {
        setError("Failed to load intelligence node: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const addFaq = () => {
    setFormData(prev => ({ ...prev, faqs: [...prev.faqs, { q: "", a: "" }] }));
  };

  const updateFaq = (index: number, field: 'q' | 'a', value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][field] = value;
    setFormData(prev => ({ ...prev, faqs: newFaqs }));
  };

  const removeFaq = (index: number) => {
    setFormData(prev => ({ ...prev, faqs: formData.faqs.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const { error } = await supabase
        .from('posts')
        .update(formData)
        .eq('id', id);

      if (error) throw error;
      
      router.push("/admin/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sync intelligence node.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 animate-pulse">
        <Loader2 size={48} className="text-primary animate-spin mb-6" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-subtle">Decrypting Node Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/posts" className="p-3 rounded-xl bg-white/5 border border-white/10 text-text-subtle hover:text-primary transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="h2 italic mb-1">Edit <span className="text-primary">Intelligence Node</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest leading-none">Modifying Record: {id.slice(0,8)}</p>
          </div>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => setFormData(p => ({ ...p, published: !p.published }))}
             className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
               formData.published 
               ? 'bg-primary/20 text-primary border-primary/20' 
               : 'bg-white/5 text-text-subtle border-white/10'
             }`}
           >
             {formData.published ? 'Deployment Active' : 'Save as Draft Node'}
           </button>
           <button 
             onClick={handleSubmit}
             disabled={saving}
             className="btn-primary py-3 px-8 text-sm shadow-xl"
           >
             <Save size={18} /> {saving ? "Syncing..." : "Update Intelligence"}
           </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Article Headline</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="f-input text-xl font-black italic"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Static Permanent Slug (URL)</label>
              <div className="relative group">
                <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle" />
                <input 
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="f-input pl-12 text-sm text-primary font-bold"
                  required
                />
              </div>
            </div>
          </div>

          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Primary Content (HTML Supported)</label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={20}
              className="f-input font-mono text-sm leading-relaxed min-h-[500px]"
              required
            />
          </div>

          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white italic">Intelligence FAQs</h3>
              <button 
                type="button" 
                onClick={addFaq}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
              >
                <Plus size={14} /> Add FAQ Node
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-black/20 border border-white/5 relative group">
                  <button 
                    type="button" 
                    onClick={() => removeFaq(i)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-text-subtle hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      value={faq.q}
                      onChange={(e) => updateFaq(i, 'q', e.target.value)}
                      className="f-input bg-transparent border-none p-0 text-white font-black italic focus:ring-0"
                    />
                    <textarea 
                      value={faq.a}
                      onChange={(e) => updateFaq(i, 'a', e.target.value)}
                      rows={2}
                      className="f-input bg-transparent border-none p-0 text-text-muted text-sm focus:ring-0 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Resource Metadata</h3>
            
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Knowledge Category</label>
               <select 
                 name="category"
                 value={formData.category}
                 onChange={handleChange}
                 className="f-input"
               >
                 <option>Migration Guide</option>
                 <option>Security Audit</option>
                 <option>Case Study</option>
                 <option>Engineering Blog</option>
               </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Estimated Read Complexity</label>
               <input 
                 type="text" 
                 name="read_time"
                 value={formData.read_time}
                 onChange={handleChange}
                 className="f-input"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Intelligence Tags</label>
               <div className="flex gap-2 mb-3 flex-wrap">
                  {formData.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}><Plus size={12} className="rotate-45" /></button>
                    </span>
                  ))}
               </div>
               <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="New tag..."
                    className="f-input text-xs py-2.5"
                  />
                  <button type="button" onClick={addTag} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all">
                    <Plus size={18} />
                  </button>
               </div>
            </div>
          </div>

          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">SEO Optimization</h3>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Target Meta Title</label>
               <input 
                 type="text" 
                 name="meta_title"
                 value={formData.meta_title}
                 onChange={handleChange}
                 className="f-input text-xs"
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Intelligence Meta Description</label>
               <textarea 
                 name="meta_description"
                 value={formData.meta_description}
                 onChange={handleChange}
                 rows={3}
                 className="f-input text-xs resize-none"
               />
            </div>
          </div>

          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Visual Assets</h3>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Featured Image URL</label>
               <input 
                 type="text" 
                 name="featured_image"
                 value={formData.featured_image}
                 onChange={handleChange}
                 className="f-input text-xs"
               />
               {formData.featured_image && (
                 <div className="mt-4 rounded-xl overflow-hidden border border-white/5">
                   <img src={formData.featured_image} alt="Preview" className="w-full h-auto" />
                 </div>
               )}
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
