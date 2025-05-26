import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createServerClient as createSupabaseServerClient, type CookieOptions } from '@supabase/ssr';

// This file contains server-side only authentication functions
// For client-side auth, import from './client.ts' instead

// Create a Supabase client for server components
export const createServerClient = async (): Promise<SupabaseClient> => {
  // Dynamically import cookies to avoid client-side errors
  // This ensures 'next/headers' is only loaded on the server
  const { cookies } = await import('next/headers');
  
  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies();
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // This is a server component, so we can't set cookies directly
          // This is handled by middleware or client components
        },
        remove(name: string, options: CookieOptions) {
          // This is a server component, so we can't remove cookies directly
          // This is handled by middleware or client components
        },
      },
    }
  );
};

// Helper function to check if user is authenticated (server-side only)
export async function isAuthenticated(): Promise<boolean> {
  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

// Helper function to get current user (server-side only)
export async function getCurrentUser() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
