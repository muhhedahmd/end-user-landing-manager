// context/SectionVisibilityContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type SectionVisibilityContextType = {
  singleCompositionVisible: boolean;
  setSingleCompositionVisible: (v: boolean) => void;
};

const SectionVisibilityContext =
  createContext<SectionVisibilityContextType | null>(null);

export const SectionVisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [singleCompositionVisible, setSingleCompositionVisible] =
    useState(false);

  return (
    <SectionVisibilityContext.Provider
      value={{ singleCompositionVisible, setSingleCompositionVisible }}
    >
      {children}
    </SectionVisibilityContext.Provider>
  );
};

export const useSectionVisibility = () => {
  const ctx = useContext(SectionVisibilityContext);
  if (!ctx)
    throw new Error(
      "useSectionVisibility must be used inside SectionVisibilityProvider"
    );
  return ctx;
};
