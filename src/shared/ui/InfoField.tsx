import type { ReactNode } from 'react'

type Props = {
  label: string
  value: ReactNode | null
}

export function InfoField({ label, value }: Props) {
  return (
    <div className="flex flex-col items-start gap-y-2">
      <h6 className="text-lg font-extrabold">{label}</h6>
      <p>{value ?? '-'}</p>
    </div>
  )
}
