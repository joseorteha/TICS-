export type NivelDominio = 0 | 1 | 2 | 3

export const NIVEL_LABELS: Record<NivelDominio, string> = {
  0: 'Nunca',
  1: 'Básico',
  2: 'Intermedio',
  3: 'Experto',
}

export const NIVEL_COLORS: Record<NivelDominio, string> = {
  0: 'text-zinc-500',
  1: 'text-blue-400',
  2: 'text-indigo-400',
  3: 'text-emerald-400',
}

export interface TeacherData {
  nombre: string
  email: string
  campus: string
  academia: string
  materias: string
  anos_experiencia: number
  avatar_url?: string
}

// ── Nuevo formato de diagnóstico (preguntas por módulo, no por herramienta) ──
export interface DiagnosticoCompleto extends TeacherData {
  // Módulo 1: Google Workspace
  google_nivel: NivelDominio
  google_actividades: string[]

  // Módulo 2: Herramientas Interactivas
  herramientas_conocidas: string[]
  herramientas_frecuencia: NivelDominio

  // Módulo 3: Inteligencia Artificial
  ia_actividades: string[]
  ia_comodidad: NivelDominio

  // Módulo 4: Productividad
  productividad_nivel: NivelDominio
  actividad_consume: string

  // Final
  expectativas: string
  problema_resolver: string
}

// ── Registro completo de la BD (incluye columnas legacy mapeadas) ──
export interface TeacherRecord {
  id: string
  nombre: string
  email: string
  campus: string
  academia: string
  materias: string
  anos_experiencia: number
  avatar_url?: string
  created_at: string
  // Legacy tool scores (calculados desde módulos)
  google_classroom: number
  google_forms: number
  google_drive: number
  google_meet: number
  google_calendar: number
  canva: number
  kahoot: number
  quizizz: number
  padlet: number
  mentimeter: number
  genially: number
  chatgpt: number
  gemini: number
  gamma: number
  magicschool: number
  planeacion: number
  gestion_evidencias: number
  automatizacion: number
  retroalimentacion: number
  organizacion_digital: number
  principal_reto: string
  herramientas_aprender: string[]
  expectativas: string
  // Nuevas columnas enriquecidas
  google_nivel?: number
  google_actividades?: string[]
  herramientas_conocidas?: string[]
  herramientas_frecuencia?: number
  ia_actividades?: string[]
  ia_comodidad?: number
  productividad_nivel?: number
  actividad_consume?: string
  problema_resolver?: string
}

export interface DashboardStats {
  total: number
  por_campus: Record<string, number>
  por_academia: Record<string, number>
  promedio_google: number
  promedio_interactivas: number
  promedio_ia: number
  promedio_productividad: number
  herramienta_mas_usada: string
  herramienta_menos_usada: string
  principal_reto_frecuente: string
}
