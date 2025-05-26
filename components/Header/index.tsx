"use client";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-wide">Movie web app</h1>
        <nav className="space-x-4 text-sm">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Watch History
          </a>
        </nav>
      </div>
    </header>
  );
}
