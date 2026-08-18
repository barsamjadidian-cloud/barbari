import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import { Toaster } from "@/components/ui/Toaster";
import WhatsAppButton from "@/components/store/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "BARBARI — Exceptional Coffee, Roasted to Perfection",
    template: "%s | BARBARI",
  },
  description: "Premium specialty coffee, freshly roasted in small batches. Single-origin, blends, and equipment. Ethically sourced, craft roasted, delivered fast.",
  keywords: ["specialty coffee", "premium coffee beans", "fresh roasted coffee", "single origin", "espresso", "BARBARI"],
  authors: [{ name: "BARBARI Coffee" }],
  creator: "BARBARI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "BARBARI — Exceptional Coffee",
    description: "Premium specialty coffee, freshly roasted. Ethical, traceable, extraordinary.",
    siteName: "BARBARI",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "BARBARI Coffee" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BARBARI — Exceptional Coffee",
    description: "Premium specialty coffee, freshly roasted.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-display: 'Playfair Display', Georgia, serif;
            --font-sans: 'Inter', system-ui, sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
          }
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BARBARI",
              url: "https://barbari.coffee",
              logo: "https://barbari.coffee/logo.png",
              description: "Premium specialty coffee roaster",
              sameAs: ["https://instagram.com/barbari.coffee"],
            }),
          }}
        />
      </body>
    </html>
  );
}
