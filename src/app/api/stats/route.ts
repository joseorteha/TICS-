import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    const { data: rows, error } = await supabase
      .from('diagnosticos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    if (!rows || rows.length === 0) return NextResponse.json({ total: 0, rows: [] })

    const total = rows.length

    // Campus distribution
    const por_campus: Record<string, number> = {}
    const por_academia: Record<string, number> = {}
    const retos: Record<string, number> = {}

    for (const r of rows) {
      if (r.campus) por_campus[r.campus] = (por_campus[r.campus] || 0) + 1
      if (r.academia) por_academia[r.academia] = (por_academia[r.academia] || 0) + 1
      if (r.principal_reto) retos[r.principal_reto] = (retos[r.principal_reto] || 0) + 1
    }

    const avg = (keys: string[]) =>
      keys.reduce((sum, k) => sum + rows.reduce((s: number, r: Record<string, number>) => s + (r[k] || 0), 0) / rows.length, 0) / keys.length

    const promedio_google = avg(['google_classroom', 'google_forms', 'google_drive', 'google_meet', 'google_calendar'])
    const promedio_interactivas = avg(['canva', 'kahoot', 'quizizz', 'padlet', 'mentimeter', 'genially'])
    const promedio_ia = avg(['chatgpt', 'gemini', 'gamma', 'magicschool'])
    const promedio_productividad = avg(['planeacion', 'gestion_evidencias', 'automatizacion', 'retroalimentacion', 'organizacion_digital'])

    const herramientas = {
      'Google Classroom': rows.reduce((s: number, r: Record<string, number>) => s + r.google_classroom, 0) / rows.length,
      'Google Forms': rows.reduce((s: number, r: Record<string, number>) => s + r.google_forms, 0) / rows.length,
      'Google Drive': rows.reduce((s: number, r: Record<string, number>) => s + r.google_drive, 0) / rows.length,
      'Google Meet': rows.reduce((s: number, r: Record<string, number>) => s + r.google_meet, 0) / rows.length,
      'Google Calendar': rows.reduce((s: number, r: Record<string, number>) => s + r.google_calendar, 0) / rows.length,
      'Canva': rows.reduce((s: number, r: Record<string, number>) => s + r.canva, 0) / rows.length,
      'Kahoot': rows.reduce((s: number, r: Record<string, number>) => s + r.kahoot, 0) / rows.length,
      'Quizizz': rows.reduce((s: number, r: Record<string, number>) => s + r.quizizz, 0) / rows.length,
      'Padlet': rows.reduce((s: number, r: Record<string, number>) => s + r.padlet, 0) / rows.length,
      'Mentimeter': rows.reduce((s: number, r: Record<string, number>) => s + r.mentimeter, 0) / rows.length,
      'Genially': rows.reduce((s: number, r: Record<string, number>) => s + r.genially, 0) / rows.length,
      'ChatGPT': rows.reduce((s: number, r: Record<string, number>) => s + r.chatgpt, 0) / rows.length,
      'Gemini': rows.reduce((s: number, r: Record<string, number>) => s + r.gemini, 0) / rows.length,
      'Gamma': rows.reduce((s: number, r: Record<string, number>) => s + r.gamma, 0) / rows.length,
      'MagicSchool': rows.reduce((s: number, r: Record<string, number>) => s + r.magicschool, 0) / rows.length,
    }

    const sorted = Object.entries(herramientas).sort(([, a], [, b]) => b - a)
    const herramienta_mas_usada = sorted[0]?.[0] || 'N/A'
    const herramienta_menos_usada = sorted[sorted.length - 1]?.[0] || 'N/A'
    const principal_reto_frecuente = Object.entries(retos).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'

    return NextResponse.json({
      total,
      rows,
      por_campus,
      por_academia,
      promedio_google: +promedio_google.toFixed(2),
      promedio_interactivas: +promedio_interactivas.toFixed(2),
      promedio_ia: +promedio_ia.toFixed(2),
      promedio_productividad: +promedio_productividad.toFixed(2),
      herramientas,
      herramienta_mas_usada,
      herramienta_menos_usada,
      principal_reto_frecuente,
    })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
