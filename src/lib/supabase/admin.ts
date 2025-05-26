import { createClient } from '@supabase/supabase-js';

// Log environment variables for debugging (without revealing full values)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('Supabase URL available:', !!supabaseUrl);
console.log('Service Role Key available:', !!serviceRoleKey);

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase environment variables for admin client');
  // If in development, provide a hint about setting up .env.local
  if (process.env.NODE_ENV === 'development') {
    console.error('Make sure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file');
  }
}

// Create a Supabase client with the service role key
// This client bypasses RLS policies
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
