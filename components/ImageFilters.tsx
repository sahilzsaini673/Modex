'use client'

type Props = {
  setFilter: (filter: string) => void,
  imageSrc: string
}

const filters = [
  { name: 'Normal', className: '' },
  { name: 'Grayscale', className: 'grayscale' },
  { name: 'Sepia', className: 'sepia' },
  { name: 'Contrast', className: 'contrast-150' },
  { name: 'Saturate', className: 'saturate-200' },
]

export default function ImageFilters({ setFilter, imageSrc }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {filters.map((f, i) => (
        <button
          key={i}
          className="w-14 h-14 rounded overflow-hidden border hover:scale-105 transition"
          onClick={() => setFilter(f.className)}
        >
          <img
            src={imageSrc}
            alt={f.name}
            className={`w-full h-full object-cover ${f.className}`}
          />
        </button>
      ))}
    </div>
  )
}
