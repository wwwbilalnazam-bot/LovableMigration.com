import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#E6F5F1" }}
      >
        <div className="text-center">
          <div className="text-8xl font-extrabold mb-4" style={{ color: "#3ECF8E" }}>
            404
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#0B4F36" }}>
            Page Not Found
          </h1>
          <p className="text-base mb-8" style={{ color: "#666" }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary">
              ← Back to Home
            </Link>
            <Link href="/blog" className="btn-secondary">
              Read Migration Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
