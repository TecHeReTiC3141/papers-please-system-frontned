import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  title: string
}>

export function TicketSectionWrapper({ title, children }: Props) {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <h4 className="text-3xl w-full border-b-2 border-gray-600">{title}</h4>
      <div className="rounded-xl border-2 border-gray-600 px-3 py-2">{children}</div>
    </div>
  )
}
