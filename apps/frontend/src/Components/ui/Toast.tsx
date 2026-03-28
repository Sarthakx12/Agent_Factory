"use client";

import { Toaster } from "sonner";

export function RetroToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(17,17,34,0.95)",
          color: "#e0e8f0",
          border: "1px solid rgba(0,240,255,0.35)",
        },
      }}
    />
  );
}
