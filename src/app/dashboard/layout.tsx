import { DashboardContent } from "@/components";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export default async function DashboardLayout({
  children,
}: {
  readonly children: any;
}) {
  const user: any = await getUserMeLoader();

  return <DashboardContent user={user}>{children}</DashboardContent>;
}
