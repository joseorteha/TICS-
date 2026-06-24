import type { NivelDominio } from '@/lib/types'

interface Props {
  item: { value: NivelDominio; label: string; desc: string }
  selected: boolean
  onClick: () => void
}

export function NivelCard({ item, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
        selected
          ? 'border-teal-500 bg-teal-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/30'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
            selected ? 'border-teal-600 bg-teal-600' : 'border-gray-300'
          }`}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <div className="flex-1">
          <p className={`font-semibold text-sm leading-tight ${selected ? 'text-teal-900' : 'text-gray-800'}`}>
            {item.label}
          </p>
          <p className={`text-xs mt-0.5 leading-snug ${selected ? 'text-teal-600' : 'text-gray-400'}`}>
            {item.desc}
          </p>
        </div>
      </div>
    </button>
  )
}
