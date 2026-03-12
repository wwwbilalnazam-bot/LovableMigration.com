"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Globe, 
  FileText, 
  Plus, 
  Trash2,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    meta_title: "",
    meta_description: "",
    keywords: "",
    category: "Migration Guide",
    tags: [] as string[],
    featured_image: "",
    author: "Migration Expert",
    read_time: "10 min read",
    published: false,
    faqs: [] as { q: string, a: string }[]
  });

  const [tagInput, setTagInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title" && !formData.slug) {
      setFormData(prev => ({ 
        ...prev, 
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));
    }
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
    setFormData(prev => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase
        .from('posts')
        .insert([formData]);

      if (error) throw error;
      
      router.push("/admin/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save intelligence node.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/posts" className="p-3 rounded-xl bg-white/5 border border-white/10 text-text-subtle hover:text-primary transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="h2 italic mb-1">New <span className="text-primary">Intelligence Node</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest leading-none">Drafting High-Context Resource</p>
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
             disabled={loading}
             className="btn-primary py-3 px-8 text-sm shadow-xl"
           >
             <Save size={18} /> {loading ? "Syncing..." : "Finalize Deployment"}
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
          
          {/* Title & Slug */}
          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Article Headline</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. The Ultimate Guide to Supabase Scaling"
                className="f-input text-xl font-black italic italic-placeholder"
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
                  placeholder="ultimate-supabase-scaling-guide"
                  className="f-input pl-12 text-sm text-primary font-bold"
                  required
                />
              </div>
            </div>
          </div>

          {/* Editor Placeholder / Content Content */}
          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Primary Content (HTML Supported)</label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={20}
              className="f-input font-mono text-sm leading-relaxed min-h-[500px]"
              placeholder="<h2>Introduction</h2><p>Begin your intelligence report here...</p>"
              required
            />
          </div>

          {/* FAQs */}
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
                      placeholder="Query / Question"
                      className="f-input bg-transparent border-none p-0 text-white font-black italic focus:ring-0"
                    />
                    <textarea 
                      value={faq.a}
                      onChange={(e) => updateFaq(i, 'a', e.target.value)}
                      placeholder="Resolution / Answer"
                      rows={2}
                      className="f-input bg-transparent border-none p-0 text-text-muted text-sm focus:ring-0 resize-none"
                    />
                  </div>
                </div>
              ))}
              {formData.faqs.length === 0 && (
                <p className="text-center text-text-subtle italic text-sm py-4">No localized FAQs attached to this node.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Metadata */}
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
                 placeholder="e.g. 12 min read"
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

          {/* SEO Intelligence */}
          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
            <div className="flex items-center gap-2 mb-2">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">SEO Optimization</h3>
               <HelpCircle size={12} className="text-text-subtle" />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Target Meta Title</label>
               <input 
                 type="text" 
                 name="meta_title"
                 value={formData.meta_title}
                 onChange={handleChange}
                 placeholder="60 chars max recommended"
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
                 placeholder="160 chars max recommended"
                 className="f-input text-xs resize-none"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Primary Keywords</label>
               <input 
                 type="text" 
                 name="keywords"
                 value={formData.keywords}
                 onChange={handleChange}
                 placeholder="lovable, supabase, migration, security"
                 className="f-input text-xs"
               />
            </div>
          </div>

          {/* Visual Assets */}
          <div className="glass-card !p-8 border-white/5 bg-surface/30 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Visual Assets</h3>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Featured Image URL</label>
               <input 
                 type="text" 
                 name="featured_image"
                 value={formData.featured_image}
                 onChange={handleChange}
                 placeholder="https://example.com/image.jpg"
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
