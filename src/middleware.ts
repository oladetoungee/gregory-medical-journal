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

  console.log("User Middleware", user);
  console.log("Current Path", currentPath);

  // Fixing the condition by closing the parenthesis
  if (dashboardRoutes.includes(currentPath) && user.ok === false) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
