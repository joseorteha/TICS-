import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Faltan variables de entorno', url: !!url, key: !!key }, { status: 500 })
  }

  const supabase = createClient(url, key)

  // Prueba 1: ¿podemos conectar?
  const { data: tables, error: tablesErr } = await supabase
    .from('diagnosticos')
    .select('id')
    .limit(1)

  if (tablesErr) {
    return NextResponse.json({
      status: 'ERROR',
      message: tablesErr.message,
      code: tablesErr.code,
      details: tablesErr.details,
      hint: tablesErr.hint,
    }, { status: 500 })
  }

  return NextResponse.json({
    status: 'OK',
    message: 'Conexión exitosa, tabla existe',
    rows: tables?.length ?? 0,
  })
}
