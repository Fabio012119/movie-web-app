import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Web App",
  description: "Streaming interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <AppProvider>
          <Header />
          <main className="max-w-screen-xl mx-auto px-6 py-8">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
