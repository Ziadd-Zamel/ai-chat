"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Share2, LayoutGrid } from "lucide-react";

const navLinks = [
  { label: "الصفحة الرئيسية", href: "/dashboard" },
  { label: "التطبيقات", href: "/dashboard/apps" },
  { label: "تواصل معنا", href: "/dashboard/contact" },
];

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-6 h-14 border-b border-[#232826] bg-[#0D0F0E] flex-shrink-0">
      {/* Nav Links */}
      <nav className="flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3.5 py-1.5 rounded-[7px] text-[13px] font-medium transition-colors",
              pathname === link.href
                ? "bg-[#1C1F1E] text-[#E8EDE9]"
                : "text-[#7A8A7F] hover:text-[#E8EDE9] hover:bg-[#1C1F1E]",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          className="w-[34px] h-[34px] rounded-lg border border-[#232826] bg-transparent
                     text-[#7A8A7F] hover:bg-[#1C1F1E] hover:text-[#E8EDE9]
                     flex items-center justify-center transition-colors cursor-pointer"
          title="شبكة"
        >
          <LayoutGrid size={15} />
        </button>
        <button
          className="w-[34px] h-[34px] rounded-lg border border-[#232826] bg-transparent
                     text-[#7A8A7F] hover:bg-[#1C1F1E] hover:text-[#E8EDE9]
                     flex items-center justify-center transition-colors cursor-pointer"
          title="مشاركة"
        >
          <Share2 size={15} />
        </button>
      </div>
    </header>
  );
}
