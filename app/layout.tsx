import type { Metadata } from "next";
import "./globals.css";
import "./coffee.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://barsamjadidian-cloud.github.io",
  ),
  title: { default: "بربری | قهوه، با حال خوب", template: "%s | قهوه بربری" },
  description:
    "دنیای قهوه‌های بربری؛ قهوه تک‌خاستگاه، اسپرسو و ترکیبی. قهوه دلخواهت را با وزن و آسیاب مناسب انتخاب کن. ویترین فروشگاه در حال آماده‌سازی است.",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    title: "بربری | حال خوب از یک فنجان شروع می‌شه",
    description: "دانه‌های منتخب. برشت دقیق. یک فنجان متفاوت.",
    images: [
      {
        url: `${basePath}/images/coffee-hero.webp`,
        width: 1536,
        height: 1024,
        alt: "قهوه بربری",
      },
    ],
  },
  icons: { icon: `${basePath}/icon.svg` },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
