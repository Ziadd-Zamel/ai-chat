"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useTranslations } from "next-intl";
import { useChats } from "@/app/[locale]/chat/_hooks/use-chats";

// Shown while chats are being fetched
function ChatListSkeleton() {
  return (
    <div className="flex flex-col gap-1 px-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-8 rounded-lg bg-[#1C1F1E] animate-pulse"
          style={{ opacity: 1 - i * 0.15 }}
        />
      ))}
    </div>
  );
}

// Single chat row button
function ChatItem({
  chat,
  isActive,
  onClick,
}: {
  chat: { id: string; title: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full text-right rounded-lg",
        "px-2.5 py-2 text-sm transition-colors duration-100 cursor-pointer",
        isActive
          ? "bg-[#1C1F1E] text-[#E8EDE9] border border-[#2a2f2d]"
          : "text-[#7A8A7F] hover:bg-[#1C1F1E] hover:text-[#E8EDE9] border border-transparent",
      )}
    >
      <span className="truncate">{chat.title}</span>
    </button>
  );
}

export default function SidebarChatList({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  // Sidebar collapsed state
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // i18n
  const t = useTranslations("chat");

  // Fetch chat history
  const { data: chats, isLoading } = useChats();

  // Track which chat is selected in the URL
  const [chatId, setChatId] = useQueryState("chatId");

  if (isCollapsed || !isLoggedIn) return null;

  return (
    <div className="flex flex-col gap-0.5 overflow-y-auto h-full">
      {/* Divider + section label */}
      <div className="h-px bg-[#232826] my-2" />
      <p className="text-sm font-medium text-[#4A5C50] uppercase tracking-widest px-2 py-1">
        {t("recentChats")}
      </p>

      {/* Loading skeleton */}
      {isLoading && <ChatListSkeleton />}

      {/* Chat list */}
      {!isLoading &&
        chats?.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={chatId === chat.id}
            onClick={() => setChatId(chat.id)}
          />
        ))}

      {/* Empty state */}
      {!isLoading && chats?.length === 0 && (
        <p className="text-xs text-[#4A5C50] px-2 py-2">{t("noChats")}</p>
      )}
    </div>
  );
}
