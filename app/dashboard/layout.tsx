import { DashboardLayout } from "@/components/dashboard/layout-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
