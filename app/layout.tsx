import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  title: "Developers & Coders Club - NIT Agartala",
  description: "The premier technical club at NIT Agartala focused on competitive programming, web development, and open-source contributions.",
  keywords: ["DCC", "NIT Agartala", "Coding Club", "Programming", "Development", "Open Source"],
  authors: [{ name: "DCC NIT Agartala" }],
  openGraph: {
    title: "Developers & Coders Club - NIT Agartala",
    description: "Learn. Build. Compete.",
    type: "website",
    url: "https://www.dccnita.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-[#0a0a0a] text-[#ededed]`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen relative overflow-hidden">
             {/* Global Grid Background for Cyberpunk feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 -z-10 pointer-events-none" />
            {children}
          </main>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
