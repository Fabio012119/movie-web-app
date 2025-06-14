"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useGetGenres } from "@/hooks/useGetGenres";
import type { AppState } from "@/types/general";

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedContentId, setSelectedContentId] = useState<string | null>(
    null,
  );

  const { genres, genresLoading, genresError } = useGetGenres();

  return (
    <AppContext.Provider
      value={{
        selectedContentId,
        setSelectedContentId,
        genres,
        genresLoading,
        genresError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
