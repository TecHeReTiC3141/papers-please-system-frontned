import type { FC } from 'react'

type Props = {
  text?: string
}

export const Loader: FC<Props> = ({ text }) => (
  <div className="flex flex-col justify-center items-center h-64">
    <span className="loading loading-spinner w-12 h-12 text-primary" />
    {text && <p className="font-bold">{text}</p>}
  </div>
)
