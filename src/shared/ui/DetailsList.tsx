import type { ReactNode } from 'react'

type DetailItem = { label: string; value: ReactNode }

type DetailsListProps = {
  items: DetailItem[]
}

export function DetailsList({ items }: DetailsListProps) {
  return (
    <div className="grid grid-cols-2 gap-y-2 gap-x-6 justify-start">
      {items.map((item) => (
        <>
          <span className="text-gray-400 w-fit">{item.label}</span>
          {item.value}
        </>
      ))}
    </div>
  )
}
