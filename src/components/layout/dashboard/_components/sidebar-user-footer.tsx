"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";

// Get the first letter of the name for the avatar
function getInitial(name: string) {
  return name?.trim().charAt(0).toUpperCase() ?? "?";
}

export default function SidebarUserFooter({
  session,
}: {
  session: Session | null;
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Don't render if not logged in
  if (!session) return null;

  const { name, email } = session.user;

  return (
    <>
      <div className="h-px bg-[#232826] mb-2" />
      <button
        className={cn(
          "flex items-center gap-2.5 w-full rounded-lg px-2.5 py-2",
          "hover:bg-[#1C1F1E] transition-colors cursor-pointer",
          isCollapsed && "justify-center px-2",
        )}
      >
        {/* Avatar — initial letter from real name */}
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#2DD56A] to-[#1a8040] flex items-center justify-center text-[12px] font-semibold text-[#0a2a12] shrink-0">
          {getInitial(name)}
        </div>

        {/* Name + email, hidden when sidebar is collapsed */}
        {!isCollapsed && (
          <div className="overflow-hidden text-right">
            <p className="text-[13px] font-medium text-[#E8EDE9] truncate">
              {name}
            </p>
            <p className="text-[11px] text-[#7A8A7F] truncate">{email}</p>
          </div>
        )}
      </button>
    </>
  );
}
