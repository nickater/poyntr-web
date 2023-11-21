// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const userToDelete = await supabase.from('user_deletion_requests').select('*')

    if (userToDelete.count === 0 || !userToDelete.data) {
      return new Response(JSON.stringify({ data: 'No user deletion requests found.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    for (const user of userToDelete.data) {
      const { error } = await supabase.auth.admin.deleteUser(user.user_id)

      if (error) {
        throw error
      }
    }
    return new Response(JSON.stringify({ data: 'User deletion requests processed.' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 })
  }
})

// To invoke:
// curl - L - X POST 'https://zidpldecibkojlglfmlb.supabase.co/functions/v1/delete-user' - H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppZHBsZGVjaWJrb2psZ2xmbWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDc3NzksImV4cCI6MTk4Mzc4Mzc3OX0.6gvzWwaMnu4nE0RJXKv8mXt-5Q3zAL8ZWSrp9bI9HMM' --data '{"name":"Functions"}'
