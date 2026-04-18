"use client";

import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SidebarCustomHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <>
      <SidebarHeader className="p-0 mb-3">
        <div
          className={cn(
            "flex items-center mb-3",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          {!isCollapsed && (
            <Image
              src="/assets/Icons/Logo.svg"
              alt="Logo"
              width={30}
              height={30}
            />
          )}
          <SidebarTrigger className="bg-transparent hover:bg-white/10 transition-colors rounded-md cursor-pointer" />
        </div>

        {/* New Chat Button */}
        {isCollapsed ? (
          // Collapsed: icon-only centered button
          <button
            title="إنشاء محادثه جديدة"
            className="w-full flex items-center justify-center p-2 rounded-md
                         bg-[#0D0F0E] border-[0.5px] border-[#141716]
                         hover:bg-[#1a1d1c] hover:border-[#2a2d2c]
                         active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <Image
              src="/assets/Icons/plus-sign.svg"
              alt="Plus Icon"
              width={20}
              height={20}
            />
          </button>
        ) : (
          // Expanded: full button
          <button
            className="w-full flex items-center justify-start gap-2 px-4 py-2.5 rounded-md
                         bg-[#0D0F0E] border-[0.5px] border-[#141716] text-white text-sm font-medium
                         hover:bg-[#1a1d1c] hover:border-[#2a2d2c] hover:shadow-[0_0_0_1px_#2a2d2c]
                         active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            <Image
              src="/assets/Icons/plus-sign.svg"
              alt="Plus Icon"
              width={20}
              height={20}
            />
            إنشاء محادثه جديدة
          </button>
        )}
      </SidebarHeader>
    </>
  );
}
