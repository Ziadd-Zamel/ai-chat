"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SidebarCustomHeader from "./sidebar-header";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" collapsible="icon" {...props}>
      <div className="py-6 px-3">
        <SidebarCustomHeader />
        <SidebarContent></SidebarContent>
        <SidebarFooter></SidebarFooter>
      </div>
    </Sidebar>
  );
}
