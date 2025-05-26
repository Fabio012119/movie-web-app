"use client";

import Navigation from "../Navigation";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link href="/" className="text-2xl font-semibold tracking-wide">
          Movie web app
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
