import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { ProfileImageForm } from "@/components/forms/ProfileImageForm";

export default async function AccountRoute() {
  const user = await getUserMeLoader();
  const userData = user.data;
  const userImage = userData?.image;

  return (
    <div className="flex flex-col items-center p-4">
<h1>Account Page</h1>
    <div className="w-full max-w-lg space-y-4">
      <ProfileForm data={userData} />
      <ProfileImageForm data={userImage} />
    </div>
  </div>
  
  );
}