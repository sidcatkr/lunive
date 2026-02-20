import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ClientOnly from "@/components/ClientOnly";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lunive",
  description: "Being fancy",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    title: "Lunive",
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script — runs SYNCHRONOUSLY before first paint.
            1. Sets data-essay-theme on <html> so CSS variable selectors apply immediately.
            2. Sets data-stories on <body> when on a /stories route so navbar/footer
               CSS applies without needing :has() or any React state. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
var t=localStorage.getItem('essay-theme');
var dark=t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches);
document.documentElement.setAttribute('data-essay-theme',dark?'dark':'light');
if(window.location.pathname.startsWith('/stories')){
  document.documentElement.setAttribute('data-stories','true');
}
}catch(e){}})()`,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientOnly>
          <CustomCursor />
        </ClientOnly>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
