import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Exclude paths related to _next/static or API routes
  if (currentPath.startsWith("/_next") || currentPath.startsWith("/api")) {
    console.log("Skipping middleware for static files or API routes");
    return NextResponse.next();
  }

  // Fetch user details
  let user;
  try {
    user = await getUserMeLoader();
    console.log("User Object from getUserMeLoader:", user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If user is not authenticated, redirect to signin
  if (!user || user.ok === false) {
    console.log("User not authenticated. Redirecting to /signin...");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If navigating to any /dashboard route, ensure user is authenticated
  if (user) {
    console.log("Authenticated user accessing:", currentPath);
  }

  return NextResponse.next();
}
