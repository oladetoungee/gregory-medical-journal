import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // No restrictions - Allow all routes to be accessed
  console.log("Middleware running, no restrictions applied.");
  return NextResponse.next();
}
