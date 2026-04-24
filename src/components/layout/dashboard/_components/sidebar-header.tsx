"use client";

import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Plus, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

export default function SidebarCustomHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const t = useTranslations("chat");

  // Clear chatId param to reset to a fresh chat
  const [, setChatId] = useQueryState("chatId");
  const handleNewChat = () => setChatId(null);

  return (
    <SidebarHeader className="p-0 mb-2 gap-3">
      {/* Logo + collapse trigger */}
      <div
        className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2DD56A] flex items-center justify-center shrink-0">
              <Image
                src="/assets/Icons/Logo.svg"
                alt="Logo"
                width={16}
                height={16}
              />
            </div>
            <span className="text-[15px] font-semibold text-[#E8EDE9]">
              {t("brandName")}
            </span>
          </div>
        )}

        <SidebarTrigger
          title={isCollapsed ? t("expandSidebar") : t("collapseSidebar")}
          className={cn(
            "w-8 h-8 flex items-center justify-center shrink-0",
            "rounded-lg border border-[#232826] bg-transparent",
            "text-[#7A8A7F] hover:bg-[#1C1F1E] hover:text-[#E8EDE9]",
            "transition-colors duration-150 cursor-pointer [&>svg]:hidden",
          )}
        >
          {isCollapsed ? (
            <PanelRightOpen size={15} />
          ) : (
            <PanelRightClose size={15} />
          )}
        </SidebarTrigger>
      </div>

      {/* New chat button — collapsed: icon only, expanded: full width */}
      {isCollapsed ? (
        <button
          onClick={handleNewChat}
          title={t("newChat")}
          className={cn(
            "w-8 h-8 flex items-center justify-center shrink-0 mx-auto",
            "rounded-lg border border-[#2a2f2d] bg-[#161918]",
            "hover:bg-[#1C1F1E] active:scale-[0.96]",
            "transition-all duration-150 cursor-pointer",
          )}
        >
          <Plus size={16} className="text-[#2DD56A]" />
        </button>
      ) : (
        <button
          onClick={handleNewChat}
          className={cn(
            "w-full flex items-center justify-start gap-2",
            "px-3 py-2.5 rounded-[9px]",
            "border border-[#2a2f2d] bg-[#161918] text-[#E8EDE9]",
            "hover:bg-[#1C1F1E] active:scale-[0.98]",
            "transition-all duration-150 cursor-pointer",
            "text-[13px] font-medium",
          )}
        >
          <Plus size={17} className="text-[#2DD56A] shrink-0" />
          <span>{t("newChat")}</span>
        </button>
      )}
    </SidebarHeader>
  );
}
