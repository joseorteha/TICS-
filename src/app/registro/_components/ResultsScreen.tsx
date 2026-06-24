'use client'

import { motion } from 'framer-motion'
import { Loader2, CheckCircle2, TrendingUp, Zap, Star } from 'lucide-react'
import type { DiagnosticoCompleto } from '@/lib/types'

interface Props {
  data: DiagnosticoCompleto
  isPending: boolean
  onSubmit: () => void
}

const MODULE_STYLES = [
  { bg: 'bg-blue-50', bar: 'bg-blue-400', badge: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Google Workspace' },
  { bg: 'bg-purple-50', bar: 'bg-purple-400', badge: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Herramientas Interactivas' },
  { bg: 'bg-emerald-50', bar: 'bg-emerald-400', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Inteligencia Artificial' },
  { bg: 'bg-amber-50', bar: 'bg-amber-400', badge: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Productividad Digital' },
]

function computeProfile(data: DiagnosticoCompleto) {
  const herramientasScore = Math.min(data.herramientas_conocidas.length, 3)

  const scores = [
    { pct: (data.google_nivel / 3) * 100, raw: data.google_nivel },
    { pct: (herramientasScore / 3) * 100, raw: herramientasScore },
    { pct: (data.ia_comodidad / 3) * 100, raw: data.ia_comodidad },
    { pct: (data.productividad_nivel / 3) * 100, raw: data.productividad_nivel },
  ]

  const strengths: string[] = []
  const opportunities: string[] = []

  if (data.google_nivel >= 2) strengths.push('Google Workspace')
  else opportunities.push('Google Workspace')

  if (herramientasScore >= 3) strengths.push('Herramientas Interactivas')
  else opportunities.push('Herramientas Interactivas')

  if (data.ia_comodidad >= 2) strengths.push('Inteligencia Artificial')
  else opportunities.push('Inteligencia Artificial')

  if (data.productividad_nivel >= 2) strengths.push('Productividad Digital')
  else opportunities.push('Productividad Digital')

  const recommendations: string[] = []
  if (opportunities.includes('Inteligencia Artificial'))
    recommendations.push('Explorar ChatGPT o Gemini para preparar planeaciones en minutos, no horas.')
  if (opportunities.includes('Google Workspace'))
    recommendations.push('Usar Google Classroom y Forms para entregar y calificar tareas sin papel.')
  if (opportunities.includes('Herramientas Interactivas'))
    recommendations.push('Probar Kahoot o Quizizz una vez al mes para dinamizar tus clases.')
  if (opportunities.includes('Productividad Digital'))
    recommendations.push('Organizar tus materiales en Google Drive para encontrarlos en segundos.')
  if (recommendations.length === 0)
    recommendations.push('Profundizar en IA para evaluación personalizada y retroalimentación automática.')

  const avgScore = scores.reduce((a, s) => a + s.pct, 0) / scores.length
  const nivel =
    avgScore >= 67 ? 'Docente Digital Avanzado' :
    avgScore >= 34 ? 'Docente Digital Intermedio' :
    'Docente Digital en Desarrollo'

  return { scores, strengths, opportunities, recommendations: recommendations.slice(0, 3), nivel }
}

export function ResultsScreen({ data, isPending, onSubmit }: Props) {
  const { scores, strengths, opportunities, recommendations, nivel } = computeProfile(data)
  const initials = data.nombre.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/60 to-white pt-24 pb-20 px-4">
      <div className="max-w-lg mx-auto">

        {/* Celebration header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
            className="text-6xl mb-4 select-none"
          >
            🎉
          </motion.div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">¡Diagnóstico completado!</h1>
          <p className="text-gray-500 text-sm">Aquí está tu perfil docente digital. Guárdalo para ver el análisis completo.</p>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden mb-4"
        >
          {/* Top banner */}
          <div className="h-2 bg-gradient-to-r from-teal-500 to-sky-400" />

          <div className="p-6">
            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-6">
              {data.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.avatar_url}
                  alt={data.nombre}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-teal-100"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white font-black text-lg shrink-0">
                  {initials}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-black text-gray-900 truncate">{data.nombre}</p>
                <p className="text-sm text-gray-400">{data.campus} · Lenguas Extranjeras</p>
                <div className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold">
                  <Star className="w-3 h-3 fill-teal-500 text-teal-500" />
                  {nivel}
                </div>
              </div>
            </div>

            {/* Module score bars */}
            <div className="space-y-3">
              {scores.map((s, i) => (
                <div key={i} className={`rounded-xl p-3 ${MODULE_STYLES[i].bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600">{MODULE_STYLES[i].label}</span>
                    <span className="text-xs font-bold text-gray-500">{Math.round(s.pct)}%</span>
                  </div>
                  <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${MODULE_STYLES[i].bar} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Strengths */}
        {strengths.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <h3 className="font-bold text-gray-800 text-sm">Tus fortalezas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {strengths.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Opportunities */}
        {opportunities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-sky-500" />
              <h3 className="font-bold text-gray-800 text-sm">Áreas de crecimiento</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {opportunities.map((o) => (
                <span key={o} className="px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
                  {o}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-gray-800 text-sm">Recomendaciones para ti</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Submit */}
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={isPending}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          whileHover={{ scale: isPending ? 1 : 1.02 }}
          whileTap={{ scale: isPending ? 1 : 0.98 }}
          className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base transition-colors shadow-lg shadow-teal-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Guardando tu perfil...
            </>
          ) : (
            'Guardar diagnóstico y ver mi perfil completo →'
          )}
        </motion.button>

        <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
          Tu información es confidencial y se usará únicamente para personalizar tu capacitación docente.
        </p>
      </div>
    </div>
  )
}
