"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Cookies.set("admin_session", data.token, { expires: 1 });
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 border border-primary/20">
            <Lock size={32} />
          </div>
          <h1 className="h2 mb-2 italic">Admin <span className="text-primary">Intelligence</span></h1>
          <p className="text-text-muted text-sm uppercase tracking-widest font-black">Secure Login Required</p>
        </div>

        <div className="glass-card p-8 border-white/5 bg-surface/30">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Email Address</label>
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@lovablemigration.com"
                  className="f-input pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-subtle ml-1">Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="f-input pl-12"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold animate-shake">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-sm shadow-xl"
            >
              {loading ? "Decrypting..." : "Access Control Center"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-text-subtle text-[10px] uppercase tracking-[0.2em]">
          &copy; 2025 Lovable Migration Specialists
        </p>
      </div>
    </main>
  );
}
