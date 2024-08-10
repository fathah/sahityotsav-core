import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLogged } from "./function/auth/token";

export async function middleware(request: NextRequest) {

  if (!isLogged()) {
    return NextResponse.redirect(new URL(`/no-access`, request.url));
  }
  return NextResponse.next();
}
