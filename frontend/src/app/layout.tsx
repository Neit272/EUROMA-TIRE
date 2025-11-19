import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { QuickContact } from "@/components/layout/QuickContact";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Công ty EUROMA - Uy tín, Chất lượng",
  description: "EUROMA - Chuyên cung cấp các loại lốp xe máy cày chính hãng. Giá cả cạnh tranh, dịch vụ chuyên nghiệp.",
  openGraph: {
    title: "Công ty EUROMA - Uy tín, Chất lượng",
    description: "EUROMA - Chuyên cung cấp các loại lốp xe máy cày chính hãng. Giá cả cạnh tranh, dịch vụ chuyên nghiệp.",
    images: [
      {
        url: "/icon.png",
        width: 40,
        height: 40,
        alt: "Euroma Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <LoadingScreen />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster richColors />
        <QuickContact />
      </body>
    </html>
  );
}
