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

  // Avoid redirect loop for /signin path and allow public pages
  if (currentPath === "/signin" || !currentPath.startsWith("/dashboard")) {
    console.log("Public page accessed, no auth required.");
    return NextResponse.next();
  }

  // Fetch user details for dashboard pages only
  let user;
  try {
    user = await getUserMeLoader();
    console.log("User Object from getUserMeLoader:", user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Check if user is authenticated
  if (!user || user.ok === false) {
    console.log("User not authenticated. Redirecting to /signin...");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // User is authenticated and accessing a dashboard page
  console.log("Authenticated user accessing dashboard:", currentPath);

  // Default action
  return NextResponse.next();
}
