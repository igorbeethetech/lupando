# Environment Setup Instructions

To fix the row-level security (RLS) issues, you need to set up the Supabase service role key in your environment variables.

## Steps to Fix the Issue

1. Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

2. Get your Supabase service role key from the Supabase dashboard:
   - Go to your Supabase project dashboard
   - Click on "Settings" in the sidebar
   - Click on "API" in the submenu
   - Copy the "service_role key" (Note: Keep this key secure and never expose it to the client)

3. Restart your development server after adding these environment variables

## Why This Is Needed

The service role key is required for the server-side API routes to bypass row-level security policies. This allows the API routes to perform operations that would otherwise be blocked by RLS, such as inserting data into the `company_answers`, `person_answers`, and `people` tables.

This approach maintains your existing security model because:
1. The service role key is only used in server-side code
2. It's never exposed to the client
3. All requests still go through your API validation logic
