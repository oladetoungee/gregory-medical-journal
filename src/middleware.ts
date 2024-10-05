import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  // List of restricted dashboard routes
  const dashboardRoutes = [
    "/dashboard",
    "/dashboard/account",
    "/dashboard/paper",
    "/dashboard/analytics",
  ];

  // Debugging logs
  console.log("Middleware Triggered");
  console.log("Current Path:", currentPath);
  console.log("User Object:", user);
  console.log("User OK Status:", user?.ok);

  // If the user is unauthenticated (user.ok === false), log the event and redirect
  if (dashboardRoutes.includes(currentPath)) {
    if (user?.ok === false) {
      console.log("Redirecting to /signin as user is unauthenticated.");
      return NextResponse.redirect(new URL("/signin", request.url));
    } else {
      console.log("User authenticated or has basic access. Proceeding to dashboard.");
    }
  }

  // Default action: proceed to the requested page
  return NextResponse.next();
}
