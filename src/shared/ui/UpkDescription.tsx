import type { Upk } from '@/entities/upk/types'

type Props = {
  upk: Upk
}

export function UpkDescription({ upk }: Props) {
  return (
    <p>
      {upk.name}, {upk.region}
    </p>
  )
}
