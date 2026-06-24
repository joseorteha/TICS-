import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

// GET /api/me → { status: 'no_session' | 'no_profile' | 'has_profile', profileId?: string }
export async function GET() {
  try {
    const cookieStore = await cookies()

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: () => {},
        },
      }
    )

    const { data: { session } } = await supabaseAuth.auth.getSession()

    if (!session?.user?.email) {
      return NextResponse.json({ status: 'no_session' })
    }

    const admin = getAdminClient()
    const { data: existing } = await admin
      .from('diagnosticos')
      .select('id')
      .eq('email', session.user.email)
      .maybeSingle()

    if (existing?.id) {
      return NextResponse.json({ status: 'has_profile', profileId: existing.id })
    }

    return NextResponse.json({ status: 'no_profile' })
  } catch {
    return NextResponse.json({ status: 'no_session' })
  }
}
