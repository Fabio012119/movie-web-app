"use client";
//Components
import Navigation from "../Navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className="w-full bg-gray-900 text-white px-6 py-4 shadow-md"
      role="banner"
      aria-label="Zenith Flix site header"
    >
      <div className="flex items-center justify-between max-w-screen-xl mx-auto ">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-wide flex items-center mr-1 max-sm:text-[1rem] whitespace-pre"
        >
          <Image
            width={35}
            height={50}
            src="/icon.webp"
            alt="logo"
            className="mr-2"
          />
          Zenith Flix
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
