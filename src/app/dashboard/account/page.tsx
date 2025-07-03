import { ProfileForm } from "@/components/forms/ProfileForm";
import { Typewriter } from "@/components";

export default function AccountRoute() {
  return (
    <div className="flex flex-col items-center p-4">
      <Typewriter text="👋 Welcome to your account page!" className="page-header text-2xl font-bold mb-18" />
      <div className="w-full max-w-lg space-y-4 mt-8">
        <ProfileForm />
      </div>
    </div>
  );
}