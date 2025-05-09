
import { Header } from "@/components/created/Header";
import { Footer } from "@/components/created/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <section className={` h-full antialiased`}>
        <Header />
        {children}
          <SpeedInsights />
        <Footer />
      </section>  
  );
}
