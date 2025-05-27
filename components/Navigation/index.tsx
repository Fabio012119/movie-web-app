import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="space-x-4 text-sm">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/recently-watched" className="hover:underline">
        Watch History
      </Link>
    </nav>
  );
}
