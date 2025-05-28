import { AppProvider } from "@/context/AppContext";
//Components
import LayoutShell from "@/components/LayoutShell";
import Head from "next/head";
//Assets
import { Inter } from "next/font/google";
import "./globals.css";
//Types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zenith Flix",
  description: "Streaming interface",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <AppProvider>
          <LayoutShell>{children}</LayoutShell>
        </AppProvider>
      </body>
    </html>
  );
}
