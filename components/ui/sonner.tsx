"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      richColors
      closeButton
      theme="light"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-card text-foreground border border-border shadow-lg",
          description: "text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs font-medium",
          cancelButton:
            "bg-muted text-muted-foreground rounded-md px-3 py-1.5 text-xs font-medium",
        },
      }}
      {...props}
    />
  );
}
