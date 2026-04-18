import DashboardLayout from "@/components/layout/dashboard";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
