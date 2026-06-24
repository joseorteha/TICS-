import { Check } from 'lucide-react'

interface Props {
  label: string
  checked: boolean
  onClick: () => void
}

export function CheckRow({ label, checked, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer ${
        checked
          ? 'border-teal-500 bg-teal-50 text-teal-900'
          : 'border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50/30'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
          checked ? 'bg-teal-600 border-teal-600' : 'border-gray-300'
        }`}
      >
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium leading-snug">{label}</span>
    </button>
  )
}
