import { AppSidebar } from "@/components/layout/dashboard/_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Locale
  const locale = await getLocale();

  return (
    <SidebarProvider>
      <AppSidebar side={locale === "ar" ? "right" : "left"} />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-[#0D0F0E] p-6">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
