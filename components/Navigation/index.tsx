import { testIds } from "@/constants";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav
      className="space-x-4 text-sm max-md:translate-x-2 max-sm:text-[0.8rem]"
      aria-label="Main navigation"
      data-testid={testIds.navigation}
    >
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/resume-playing" className="hover:underline">
        Resume Playing
      </Link>
    </nav>
  );
}
