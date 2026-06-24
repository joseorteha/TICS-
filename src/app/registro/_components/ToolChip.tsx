import { Check } from 'lucide-react'

interface Props {
  label: string
  selected: boolean
  onClick: () => void
}

export function ToolChip({ label, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all cursor-pointer ${
        selected
          ? 'border-teal-600 bg-teal-600 text-white shadow-sm'
          : 'border-gray-200 bg-white text-gray-600 hover:border-teal-400 hover:text-teal-700'
      }`}
    >
      {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
      {label}
    </button>
  )
}
