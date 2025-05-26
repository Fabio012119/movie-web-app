//Components
import Header from "@/components/Header";

//Providers
import { AppProvider } from "@/context/AppContext";

//Types
import type { Metadata } from "next";

//Assets
import "./globals.css";
import { Inter } from "next/font/google";

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
