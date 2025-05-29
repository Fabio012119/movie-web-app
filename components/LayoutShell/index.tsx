"use client";
//Utils
import dynamic from "next/dynamic";
import { Suspense, memo } from "react";
import { useAppContext } from "@/context/AppContext";
//Components
const Header = dynamic(() => import("../Header"));
const Footer = dynamic(() => import("../Footer"));
const MovieModal = dynamic(() => import("../MovieModal"));

function LayoutShellComponent({ children }: { children: React.ReactNode }) {
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

export default memo(LayoutShellComponent);
