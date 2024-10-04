
import Payment from '@/components/Payment';
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export default async function AnalyticsPage () {
  const user = await getUserMeLoader();
  const userEmail = user.data?.email;
  const userName = user.data?.name;

  return <Payment userEmail={userEmail} userName={userName} />;
}
