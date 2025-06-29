import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Projeto RECIFIS",
  description: "Conheça o projeto que abrange os três pilares da Universidade, contemplando, portanto, ensino, pesquisa e extensão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {children}
          <SpeedInsights />
          <Toaster
          />
        {/* <Footer /> */}
      </body>
    </html>
  );
}
