'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'

interface Props {
  progress: number
  authUser: { name: string; email: string; avatar?: string } | null
  onSignOut: () => void
}

export function DiagnosticoProgress({ progress, authUser, onSignOut }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      {/* Teal progress bar */}
      <div className="h-1 bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-sky-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Nav row */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo-itsz.svg"
            alt="ITSZ"
            width={26}
            height={26}
            className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-sm font-bold text-gray-600 hidden sm:block">TICs para Teachers</span>
        </Link>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span className="font-semibold text-teal-600">{Math.round(progress)}%</span>
          <span className="hidden sm:inline">&nbsp;completado</span>
        </div>

        {authUser && (
          <div className="flex items-center gap-3">
            {authUser.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">
                {authUser.name.charAt(0)}
              </div>
            )}
            <button
              onClick={onSignOut}
              title="Cerrar sesión"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
