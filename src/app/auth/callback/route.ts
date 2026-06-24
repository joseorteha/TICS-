import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ALLOWED_DOMAINS = ['zongolica.tecnm.mx', 'itszongolica.edu.mx']

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')

  if (code) {
    // Necesitamos el SSR client solo para exchangeCodeForSession (maneja cookies de sesión)
    const { createServerClient } = await import('@supabase/ssr')
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()

    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (toSet) => {
            try { toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
          },
        },
      }
    )

    const { data, error } = await supabaseAuth.auth.exchangeCodeForSession(code)

    if (!error && data.user?.email) {
      const email = data.user.email
      const domain = email.split('@')[1]

      if (!ALLOWED_DOMAINS.includes(domain)) {
        await supabaseAuth.auth.signOut()
        return NextResponse.redirect(
          `${origin}/login?error=dominio_no_permitido&email=${encodeURIComponent(email)}`
        )
      }

      // Verificar si ya completó el diagnóstico
      const supabaseAdmin = getAdminClient()
      const { data: existing } = await supabaseAdmin
        .from('diagnosticos')
        .select('id')
        .eq('email', email)
        .maybeSingle()

      if (existing?.id) {
        // Ya tiene diagnóstico → ir al perfil
        return NextResponse.redirect(`${origin}/perfil/${existing.id}`)
      }

      // Primera vez → ir al registro
      return NextResponse.redirect(`${origin}/registro`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
