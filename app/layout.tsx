import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lovablemigration.com"),
  title: {
    default: "Lovable Cloud to Supabase Migration Experts | Starting at $300",
    template: "%s | Lovable to Supabase Migration",
  },
  description:
    "Professional Lovable Cloud to Supabase migration service. Database, authentication, and API migration. Fast turnaround, starting at $300. Book a free consultation today.",
  keywords: [
    "lovable cloud to supabase migration",
    "lovable migration",
    "move lovable app to supabase",
    "lovable backend migration",
    "supabase migration service",
    "migrate lovable database",
    "supabase backend setup",
    "supabase migration experts",
    "lovable cloud alternatives",
    "backend migration service",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lovablemigration.com",
    title: "Lovable Cloud to Supabase Migration Experts | Starting at $300",
    description:
      "Professional Lovable Cloud to Supabase migration service. Database, authentication, and API migration starting at $300.",
    siteName: "Lovable to Supabase Migration",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovable Cloud to Supabase Migration Experts",
    description: "Move your Lovable app to Supabase safely. Starting at $300.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "https://lovablemigration.com" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Lovable to Supabase Migration Service",
              description:
                "Professional Lovable Cloud to Supabase migration service",
              url: "https://lovablemigration.com",
              telephone: "+97470896755",
              priceRange: "$300-$600",
              serviceType: "Software Migration",
              areaServed: "Worldwide",
              offers: [
                {
                  "@type": "Offer",
                  name: "Basic Migration",
                  price: "300",
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  name: "Standard Migration",
                  price: "450",
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  name: "Premium Migration",
                  price: "600",
                  priceCurrency: "USD",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
