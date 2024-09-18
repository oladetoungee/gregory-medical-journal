import { DashboardOverview } from "@/components";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

// The Page component fetching user data and passing it to the DashboardOverview
export default async function Page() {
  // Fetch user data
  const user = await getUserMeLoader();

  // Pass the user as a prop to DashboardOverview
  return <DashboardOverview user={user} />;
}
