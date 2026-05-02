import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Outfit Matters — Your Most Honest Friend Has Opinions",
  description:
    "Upload your outfit and get brutally honest, hilariously real feedback from NANDRA — your AI fashion critic best friend.",
  keywords: ["fashion", "outfit", "AI", "fashion critic", "style", "outfit checker"],
  openGraph: {
    title: "Outfit Matters",
    description: "Your most honest friend has opinions about your outfit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] antialiased">
        {children}
      </body>
    </html>
  );
}
