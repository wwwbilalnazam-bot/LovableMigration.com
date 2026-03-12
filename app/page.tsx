import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Benefits from "@/components/sections/Benefits";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import LeadCapture from "@/components/sections/LeadCapture";
import FAQ from "@/components/sections/FAQ";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/blog/BlogPreview";
import SEOContent from "@/components/sections/SEOContent";

export const metadata: Metadata = {
  title: "Lovable Cloud to Supabase Migration Experts | Starting at $300",
  description:
    "Professional Lovable Cloud to Supabase migration service. Database, authentication, API migration. Fast turnaround starting at $300. Book free consultation.",
  alternates: { canonical: "https://lovablemigration.com" },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Benefits />
        <Services />
        <Pricing />
        <Process />
        <Testimonials />
        <LeadCapture />
        <BlogPreview />
        <SEOContent />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
