import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarCustomHeader from "./sidebar-header";
import SidebarChatList from "./sidebar-chat-list";
import SidebarUserFooter from "./sidebar-user-footer";
import { Session } from "next-auth";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  session: Session | null;
};

export async function AppSidebar({ session, ...props }: AppSidebarProps) {
  const isLoggedIn = !!session;

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex flex-col h-full py-4 px-3 gap-2">
        <SidebarCustomHeader />
        <SidebarContent className="flex-1 overflow-hidden p-0">
          <SidebarChatList isLoggedIn={isLoggedIn} />
        </SidebarContent>
        <SidebarFooter className="p-0">
          <SidebarUserFooter session={session} />
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
