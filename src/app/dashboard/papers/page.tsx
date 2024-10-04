import { ManuscriptSubmission } from '@/components';
import { getUserMeLoader } from "@/data/services/get-user-me-loader";


export default async function Papers () {
  const user = await getUserMeLoader();
  const userData = user.data;
  return <ManuscriptSubmission user={userData}/>;
}
