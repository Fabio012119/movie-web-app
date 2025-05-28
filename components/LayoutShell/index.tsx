"use client";

import { useAppContext } from "@/context/AppContext";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("../Header"));
const Footer = lazy(() => import("../Footer"));
const MovieModal = lazy(() => import("../MovieModal"));

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedContentId } = useAppContext();

  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className="max-w-screen-xl mx-auto px-6 py-8">{children}</main>

      {selectedContentId !== null && (
        <Suspense fallback={null}>
          <MovieModal />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
