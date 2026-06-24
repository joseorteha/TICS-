'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Props {
  emoji: string
  title: string
  subtitle: string
  moduleNumber: number
  onContinue: () => void
}

export function ModuleTransition({ emoji, title, subtitle, moduleNumber, onContinue }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-600 via-teal-500 to-sky-500 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-center max-w-sm"
      >
        {/* Module badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-xs font-bold uppercase tracking-widest mb-8"
        >
          Módulo {moduleNumber} de 4
        </motion.div>

        {/* Emoji bounce */}
        <motion.div
          initial={{ scale: 0.4, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
          className="text-8xl mb-6 select-none"
        >
          {emoji}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-3xl font-black text-white mb-3 leading-tight"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-white/75 text-base leading-relaxed mb-10"
        >
          {subtitle}
        </motion.p>

        {/* Continue button */}
        <motion.button
          type="button"
          onClick={onContinue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-teal-700 font-bold text-base hover:bg-teal-50 transition-colors shadow-xl shadow-teal-900/25 cursor-pointer"
        >
          Comenzar módulo
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  )
}
