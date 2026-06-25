import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'

const PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || 'admin2025'

const NIVEL_LABELS: Record<number, string> = {
  0: 'Sin uso',
  1: 'Básico',
  2: 'Frecuente',
  3: 'Avanzado',
}

const ACTIVIDAD_LABELS: Record<string, string> = {
  planeacion:   'Planear clases',
  calificacion: 'Calificar trabajos',
  evidencias:   'Organizar evidencias',
  materiales:   'Elaborar materiales',
  comunicacion: 'Comunicarse con alumnos',
  reportes:     'Elaborar reportes',
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (key !== PASSWORD) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const { data: rows, error } = await supabase
    .from('diagnosticos')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!rows || rows.length === 0)
    return NextResponse.json({ error: 'Sin datos' }, { status: 404 })

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const nivel = (n: number | undefined | null) => NIVEL_LABELS[n ?? 0] ?? 'Sin uso'
  const arr   = (v: unknown) => (Array.isArray(v) ? (v as string[]) : [])
  const bool  = (arr: string[], val: string) => arr.includes(val) ? 'Sí' : 'No'
  const fecha = (s: string) => new Date(s).toLocaleDateString('es-MX')

  // ── Sheet 1: Resumen general ─────────────────────────────────────────────────

  const resumen = rows.map((r) => {
    const gNivel  = Number(r.google_nivel   ?? 0)
    const hFrec   = Number(r.herramientas_frecuencia ?? 0)
    const iaCom   = Number(r.ia_comodidad   ?? 0)
    const pNivel  = Number(r.productividad_nivel ?? 0)
    const pct     = Math.round(((gNivel + hFrec + iaCom + pNivel) / 12) * 100)
    const hCount  = arr(r.herramientas_conocidas).length
    return {
      'Nombre':                r.nombre,
      'Campus':                r.campus,
      'Academia':              r.academia,
      'Materias':              r.materias,
      'Años de experiencia':   r.anos_experiencia ?? 0,
      'Google Workspace':      nivel(gNivel),
      'Herramientas interactivas': nivel(hFrec),
      'Herramientas conocidas (cant.)': hCount,
      'Inteligencia Artificial': nivel(iaCom),
      'Productividad digital': nivel(pNivel),
      'Nivel global (%)':      `${pct}%`,
      'Fecha de diagnóstico':  r.created_at ? fecha(r.created_at) : '',
    }
  })

  // ── Sheet 2: Google Workspace ────────────────────────────────────────────────

  const google = rows.map((r) => {
    const acts = arr(r.google_actividades)
    return {
      'Nombre':         r.nombre,
      'Campus':         r.campus,
      'Nivel Google':   nivel(r.google_nivel),
      'Classroom':      bool(acts, 'classroom'),
      'Forms':          bool(acts, 'forms'),
      'Drive':          bool(acts, 'drive'),
      'Meet':           bool(acts, 'meet'),
      'Calendar':       bool(acts, 'calendar'),
      'Ninguna':        bool(acts, 'ninguna'),
    }
  })

  // ── Sheet 3: Herramientas Interactivas ───────────────────────────────────────

  const herramientas = rows.map((r) => {
    const tools = arr(r.herramientas_conocidas)
    return {
      'Nombre':        r.nombre,
      'Campus':        r.campus,
      'Canva':         bool(tools, 'Canva'),
      'Kahoot':        bool(tools, 'Kahoot'),
      'Quizizz':       bool(tools, 'Quizizz'),
      'Padlet':        bool(tools, 'Padlet'),
      'Mentimeter':    bool(tools, 'Mentimeter'),
      'Genially':      bool(tools, 'Genially'),
      'Frecuencia de uso': nivel(r.herramientas_frecuencia),
    }
  })

  // ── Sheet 4: Inteligencia Artificial ────────────────────────────────────────

  const ia = rows.map((r) => {
    const acts = arr(r.ia_actividades)
    return {
      'Nombre':            r.nombre,
      'Campus':            r.campus,
      'Comodidad con IA':  nivel(r.ia_comodidad),
      'Planeaciones':      bool(acts, 'planeacion'),
      'Actividades':       bool(acts, 'actividades'),
      'Exámenes':          bool(acts, 'examenes'),
      'Presentaciones':    bool(acts, 'presentaciones'),
      'Rúbricas':          bool(acts, 'rubricas'),
      'Retroalimentación': bool(acts, 'retroalimentacion'),
      'No la ha usado':    bool(acts, 'ninguna'),
    }
  })

  // ── Sheet 5: Productividad y comentarios ────────────────────────────────────

  const productividad = rows.map((r) => ({
    'Nombre':                      r.nombre,
    'Campus':                      r.campus,
    'Organización digital':        nivel(r.productividad_nivel),
    'Actividad que consume + tiempo': ACTIVIDAD_LABELS[r.actividad_consume] ?? r.actividad_consume ?? '',
    'Expectativas de la capacitación': r.expectativas ?? '',
    'Problema que quisiera resolver': r.problema_resolver ?? '',
  }))

  // ── Build workbook ───────────────────────────────────────────────────────────

  const wb = XLSX.utils.book_new()

  const addSheet = (name: string, data: Record<string, unknown>[]) => {
    const ws = XLSX.utils.json_to_sheet(data)
    // Auto column widths (rough estimate)
    const cols = Object.keys(data[0] || {}).map((k) => ({
      wch: Math.max(k.length, ...data.map((r) => String(r[k] ?? '').length), 12),
    }))
    ws['!cols'] = cols
    XLSX.utils.book_append_sheet(wb, ws, name)
  }

  addSheet('Resumen general',         resumen)
  addSheet('Google Workspace',        google)
  addSheet('Herramientas interactivas', herramientas)
  addSheet('Inteligencia Artificial', ia)
  addSheet('Productividad',           productividad)

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  const today = new Date().toISOString().slice(0, 10)

  return new NextResponse(buf, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="diagnosticos_tics_${today}.xlsx"`,
    },
  })
}
