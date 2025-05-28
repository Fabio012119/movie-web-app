//Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieModal from "@/components/MovieModal";
import Head from "next/head";
//Providers
import { AppProvider } from "@/context/AppContext";
//Types
import type { Metadata } from "next";
//Assets
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenith Flix",
  description: "Streaming interface",
};

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
          <Header />
          <main className="max-w-screen-xl mx-auto px-6 py-8">{children}</main>
          <MovieModal />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
