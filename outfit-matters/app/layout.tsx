import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Outfit Matters — Your Most Honest Friend Has Opinions",
  description:
    "Upload your outfit and get brutally honest feedback from NANDRA — your AI fashion critic.",
  keywords: ["fashion", "outfit", "AI", "fashion critic", "style"],
  openGraph: {
    title: "Outfit Matters",
    description: "Your most honest friend has opinions about your outfit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#080808] text-[#EEEEEE] antialiased" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
