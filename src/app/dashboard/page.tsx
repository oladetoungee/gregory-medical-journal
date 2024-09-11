import Link from "next/link";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";


export default async function Header() {
  const user = await getUserMeLoader();
  console.log(user);

  return (
    <h3>Dashboard Content</h3>
  );
}
