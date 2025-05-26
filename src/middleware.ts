import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create a Supabase client for auth
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // If we're in a middleware, we need to use the NextResponse to set the cookie
          response.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          // If we're in a middleware, we need to use the NextResponse to delete the cookie
          response.cookies.delete(name);
        },
      },
    }
  );

  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/avaliacao',
    '/perfil',
    '/pessoas',
    '/resultado',
  ];

  // Auth routes (redirect to dashboard if already logged in)
  const authRoutes = ['/login'];

  // Current path
  const path = request.nextUrl.pathname;

  // Check if the route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.some(route => path === route);

  // Redirect logic
  if (isProtectedRoute && !session) {
    // Redirect to login page if trying to access protected route without auth
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && session) {
    // Redirect to dashboard if already logged in and trying to access login page
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/avaliacao/:path*',
    '/perfil/:path*',
    '/pessoas/:path*',
    '/resultado/:path*',
  ],
};
