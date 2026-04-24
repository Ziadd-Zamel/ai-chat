import { AppSidebar } from "@/components/layout/dashboard/_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";
import Header from "../header";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const session = await getServerSession();

  return (
    <SidebarProvider>
      <AppSidebar session={session} side={locale === "ar" ? "right" : "left"} />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#0D0F0E]">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
