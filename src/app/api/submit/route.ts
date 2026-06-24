import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = getAdminClient()

    // Protección contra duplicados
    if (body.email) {
      const { data: existing } = await supabase
        .from('diagnosticos')
        .select('id')
        .eq('email', body.email)
        .maybeSingle()
      if (existing?.id) return NextResponse.json({ id: existing.id })
    }

    // ── Leer campos del nuevo formato ──
    const googleNivel         = Number(body.google_nivel) || 0
    const herramientasConocidas: string[] = body.herramientas_conocidas || []
    const herramientasFrecuencia = Number(body.herramientas_frecuencia) || 0
    const iaActividades: string[] = body.ia_actividades || []
    const iaComodidad         = Number(body.ia_comodidad) || 0
    const productividadNivel  = Number(body.productividad_nivel) || 0

    // ── Mapear a columnas legacy (para que perfil y dashboard sigan funcionando) ──
    const tool = (name: string) =>
      herramientasConocidas.includes(name) ? Math.max(1, herramientasFrecuencia) : 0

    const ningunaIA = iaActividades.length === 1 && iaActividades[0] === 'ninguna'
    const iaScore   = (!ningunaIA && (iaActividades.length > 0 || iaComodidad > 0))
      ? Math.max(1, iaComodidad)
      : 0

    const payload = {
      nombre:             body.nombre,
      email:              body.email,
      avatar_url:         body.avatar_url || null,
      campus:             body.campus,
      academia:           body.academia,
      materias:           body.materias,
      anos_experiencia:   Number(body.anos_experiencia) || 0,

      // Google Workspace — todas las herramientas reciben el nivel de módulo
      google_classroom: googleNivel,
      google_forms:     googleNivel,
      google_drive:     googleNivel,
      google_meet:      googleNivel,
      google_calendar:  googleNivel,

      // Herramientas Interactivas — conocidas reciben la frecuencia, desconocidas = 0
      canva:       tool('Canva'),
      kahoot:      tool('Kahoot'),
      quizizz:     tool('Quizizz'),
      padlet:      tool('Padlet'),
      mentimeter:  tool('Mentimeter'),
      genially:    tool('Genially'),

      // IA — score derivado de la comodidad (0 si marcó "nunca")
      chatgpt:     iaScore,
      gemini:      iaScore,
      gamma:       iaScore,
      magicschool: iaScore,

      // Productividad — nivel de módulo para todas
      planeacion:           productividadNivel,
      gestion_evidencias:   productividadNivel,
      automatizacion:       productividadNivel,
      retroalimentacion:    productividadNivel,
      organizacion_digital: productividadNivel,

      // Preguntas finales (legacy fields re-mapeados)
      principal_reto:      body.actividad_consume || null,
      herramientas_aprender: herramientasConocidas,
      expectativas:        body.expectativas || null,

      // ── Columnas nuevas (requieren ALTER TABLE) ──
      google_nivel:             googleNivel,
      google_actividades:       body.google_actividades || [],
      herramientas_conocidas:   herramientasConocidas,
      herramientas_frecuencia:  herramientasFrecuencia,
      ia_actividades:           iaActividades,
      ia_comodidad:             iaComodidad,
      productividad_nivel:      productividadNivel,
      actividad_consume:        body.actividad_consume || null,
      problema_resolver:        body.problema_resolver || null,
    }

    const { data, error } = await supabase
      .from('diagnosticos')
      .insert([payload])
      .select('id')
      .single()

    if (error) {
      console.error('[submit] Supabase error:', error.code, error.message, error.hint)
      return NextResponse.json(
        { error: error.message, code: error.code, hint: error.hint },
        { status: 500 }
      )
    }

    return NextResponse.json({ id: data.id })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[submit] Error inesperado:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
