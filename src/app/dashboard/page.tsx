import Link from "next/link";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { LogoutButton } from "../../components/forms/LogoutButton";

interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    ctaButton: {
      id: number;
      text: string;
      url: string;
    };
  };
}

interface AuthUserProps {
  username: string;
  email: string;
}

export function LoggedInUser({
  userData,
}: {
  readonly userData: AuthUserProps;
}) {
  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard/account"
        className="font-semibold hover:text-primary"
      >
        {userData.username}
      </Link>
      <LogoutButton />
    </div>
  );
}

async function Header({ data }: Readonly<HeaderProps>) {
  const user = await getUserMeLoader();
  console.log(user);
  const { logoText, ctaButton } = data;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <p>{logoText.text}</p>
      <div className="flex items-center gap-4">
        {user.ok ? (
          <LoggedInUser userData={user.data} />
        ) : (
          <Link href={ctaButton.url}>
            <p>{ctaButton.text}</p>
          </Link>
        )}
      </div>
    </div>
  );
}

// Default export for the page
export default async function DashboardPage() {
  // Assuming you have some data to pass to the Header component
  const data = {
    logoText: { id: 1, text: "Logo", url: "/" },
    ctaButton: { id: 1, text: "Sign Up", url: "/signup" },
  };

  return <Header data={data} />;
}
