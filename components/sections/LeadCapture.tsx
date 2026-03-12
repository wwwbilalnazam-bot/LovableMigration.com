"use client";
import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";

const WA = "https://wa.me/97470896755?text=Hi%2C%20I%20want%20to%20migrate%20my%20Lovable%20Cloud%20app%20to%20Supabase";

const WaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

import { supabase } from "@/lib/supabase";

export default function LeadCapture() {
  const [form, setForm] = useState({ name: "", email: "", projectUrl: "", projectSize: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");
      
      setStatus("success");
    } catch (err) {
      console.error('Error submitting lead:', err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="section-padding bg-surface/30 relative">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="pill mb-4">Get Started</span>
          <h2 className="h2 mb-4">
            Secure Your Migration<br />
            <span className="primary-gradient-text italic">Expert Help is One Click Away</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-lg leading-relaxed">
            Choose your preferred way to connect. WhatsApp is recommended for instant responses and real-time project discussion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* WhatsApp Card (PRIMARY) */}
          <div className="!p-0 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl flex flex-col group overflow-hidden shadow-2xl backdrop-blur-sm border">
            <div className="p-10 flex-1 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-8 shadow-[0_20px_40px_rgba(37,211,102,0.3)] group-hover:scale-110 transition-transform duration-500">
                <WaIcon />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                Chat on WhatsApp
                <span className="ml-3 text-[10px] font-black uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full align-middle">
                  Instant
                </span>
              </h3>
              <p className="text-text-muted text-base leading-relaxed mb-10 max-w-xs">
                Direct access to our engineering team. Perfect for quick questions and free audits.
              </p>

              <div className="w-full space-y-4 mb-10 text-left bg-black/40 p-6 rounded-2xl border border-white/5">
                {[
                  "Average 5-minute response time",
                  "Direct line to lead migration engineer",
                  "Send screenshots/links instantly",
                  "Free architectural consultation",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(62,207,142,0.6)]" />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto btn-wa w-full py-5 text-lg shadow-2xl"
              >
                <WaIcon />
                Message us: +974 70896755
              </a>
            </div>
          </div>

          {/* Form Card (SECONDARY) */}
          <div className="glass-card p-10 flex flex-col bg-surface/50">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                  <span className="text-primary text-4xl">✓</span>
                </div>
                <h3 className="text-2xl font-black mb-3 text-white">Application Received</h3>
                <p className="text-text-muted mb-10 max-w-xs">
                  We'll analyze your project details and get back to you within 24 hours.
                </p>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa shadow-xl">
                  <WaIcon /> Or Priority Chat on WhatsApp
                </a>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-white mb-2 tracking-tight">Detailed Project Request</h3>
                <p className="text-text-muted text-sm mb-10 italic">
                  Complete this form for a comprehensive written proposal.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">
                        Full Name
                      </label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        placeholder="John Doe" className="f-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">
                        Work Email
                      </label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange} required
                        placeholder="john@company.com" className="f-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">
                      Lovable Project URL
                    </label>
                    <input
                      type="url" name="projectUrl" value={form.projectUrl} onChange={handleChange}
                      placeholder="https://yourapp.lovable.app" className="f-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">
                      Estimated Project Size
                    </label>
                    <div className="relative group">
                      <select 
                        name="projectSize" 
                        value={form.projectSize} 
                        onChange={handleChange} 
                        className="f-input appearance-none bg-transparent cursor-pointer relative z-10 pr-12"
                      >
                        <option value="" className="bg-bg">Select size...</option>
                        <option value="small" className="bg-bg">Small MVP (&lt;1k users)</option>
                        <option value="medium" className="bg-bg">Growth SaaS (1k–10k users)</option>
                        <option value="large" className="bg-bg">Production App (&gt;10k users)</option>
                        <option value="enterprise" className="bg-bg">Enterprise / Custom</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none group-hover:scale-110 transition-transform">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">
                      Project Details & Goals
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder="What are you building? Any specific pain points?"
                      className="f-input resize-none"
                    />
                  </div>
                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
                      Something went wrong. Please try again or use WhatsApp.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full py-4 text-base shadow-xl"
                  >
                    <Send size={18} />
                    {status === "loading" ? "Submitting Inquiry..." : "Submit Migration Request"}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
