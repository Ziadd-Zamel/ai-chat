import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base
        "h-12 w-full min-w-0 rounded-lg border-[0.5px] border-[#303834] bg-[#233A2E33] p-2.5 text-base transition-colors outline-none",
        // File
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Placeholder
        "placeholder:text-[#6B8F7A]",
        // Focus — green-tinted ring instead of default blue
        "focus-visible:border-[#4A7A60] focus-visible:ring-3 focus-visible:ring-[#4A7A60]/30",
        // Disabled — same green base, more transparent
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#233A2E1A] disabled:border-[#303834]/50 disabled:opacity-50",
        // Invalid
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        // Dark — slightly more opaque to stay visible on dark backgrounds
        "dark:bg-[#233A2E4D] dark:border-[#303834]",
        "dark:disabled:bg-[#233A2E26]",
        "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        "md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
