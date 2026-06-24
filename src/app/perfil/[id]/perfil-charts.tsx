'use client'

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

interface Props {
  googleNivel: number
  herramientasFrecuencia: number
  iaComodidad: number
  productividadNivel: number
}

const NIVEL_LABELS = ['Sin uso', 'Básico', 'Frecuente', 'Avanzado']

const BAR_MODULES = [
  { name: 'Google Workspace', key: 'google',        color: '#3b82f6' },
  { name: 'Herramientas',     key: 'herramientas',  color: '#a855f7' },
  { name: 'Inteligencia IA',  key: 'ia',            color: '#10b981' },
  { name: 'Productividad',    key: 'productividad', color: '#f59e0b' },
]

export function PerfilCharts({ googleNivel, herramientasFrecuencia, iaComodidad, productividadNivel }: Props) {
  const scores = {
    google:        googleNivel,
    herramientas:  herramientasFrecuencia,
    ia:            iaComodidad,
    productividad: productividadNivel,
  }

  const radarData = [
    { subject: 'Google',       A: googleNivel,          fullMark: 3 },
    { subject: 'Herramientas', A: herramientasFrecuencia, fullMark: 3 },
    { subject: 'IA',           A: iaComodidad,          fullMark: 3 },
    { subject: 'Productividad',A: productividadNivel,   fullMark: 3 },
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-6">

      {/* Radar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">Perfil de Competencias</p>
        <ResponsiveContainer width="100%" height={210}>
          <RadarChart data={radarData} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
            <PolarGrid stroke="rgba(0, 0, 0, 0.07)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'rgba(60, 70, 80, 0.55)', fontSize: 11, fontWeight: 600 }}
            />
            <Radar
              name="Nivel"
              dataKey="A"
              stroke="#0d9488"
              fill="#14b8a6"
              fillOpacity={0.18}
              strokeWidth={2.5}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.98)',
                border: '1px solid rgba(20, 184, 166, 0.25)',
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                fontSize: 12,
              }}
              formatter={(val) => [
                typeof val === 'number' ? NIVEL_LABELS[Math.round(val)] ?? val : val,
                'Nivel',
              ]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Bars */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-4">Índice Digital por Módulo</p>
        <div className="space-y-4 pt-1">
          {BAR_MODULES.map((mod) => {
            const score = scores[mod.key as keyof typeof scores]
            const pct = Math.round((score / 3) * 100)
            return (
              <div key={mod.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-600">{mod.name}</span>
                  <span className="font-bold text-gray-800">{pct}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: mod.color }}
                  />
                </div>
                <p className="text-[11px] text-gray-400">{NIVEL_LABELS[score] ?? NIVEL_LABELS[0]}</p>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
