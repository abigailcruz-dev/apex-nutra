"use client";

import { ReactNode } from "react";

export function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}

