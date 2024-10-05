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
  const user = await getUserMeLoader();

  // Logging full URL, path, and user object for debugging purposes
  console.log("=== Middleware Debugging Logs ===");
  console.log("Full URL:", request.url); // Full URL with any query params
  console.log("Pathname:", currentPath);  // Just the path without query params
  console.log("User Object:", user);      // The user object from getUserMeLoader
  console.log("User OK Status:", user?.ok); // Check if the user is authenticated
  
  // Check if we're navigating to a dashboard page
  if (currentPath.startsWith("/dashboard")) {
    console.log("Attempting to access dashboard page...");
    
    // If the user is not authenticated, redirect to the signin page
    if (user?.ok === false) {
      console.log("User is not authenticated. Redirecting to /signin...");
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // If the user is authenticated, let them through
    console.log("User is authenticated. Proceeding to dashboard...");
  }

  // Default action if no redirects or issues
  console.log("No redirects needed. Proceeding...");
  return NextResponse.next();
}
