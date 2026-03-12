"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, PlusCircle, LogOut, Eye, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_token="))
      ?.split("=")[1];
    if (!token) router.push("/admin/login");
  }, [router]);

  const logout = () => {
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { href: "/admin/posts", icon: <FileText size={18} />, label: "All Posts" },
    { href: "/admin/posts/new", icon: <PlusCircle size={18} />, label: "New Post" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#f0faf5" }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex-col flex transition-transform duration-300 lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#0B4F36" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <span className="px-2 py-1 rounded text-white text-xs font-bold" style={{ background: "#FF6B6B" }}>L</span>
          <span className="text-white font-bold text-sm">→ Supabase Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: active ? "rgba(62,207,142,0.2)" : "transparent",
                  color: active ? "#3ECF8E" : "rgba(255,255,255,0.7)",
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t space-y-2" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            <Eye size={16} /> View Blog
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-red-500 hover:text-white"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-6 py-4 border-b"
          style={{ background: "#fff", borderColor: "#e8f4ef" }}
        >
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setSidebarOpen(true)}
            style={{ color: "#0B4F36" }}
          >
            <Menu size={20} />
          </button>
          <h1 className="font-bold text-base" style={{ color: "#0B4F36" }}>
            Blog Admin Panel
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <span
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: "#E6F5F1", color: "#0B4F36" }}
            >
              Admin
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
