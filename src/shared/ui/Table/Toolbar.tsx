import type { FC, ReactNode } from 'react'
import type { ToolbarButton } from './types'

type Props = {
  buttons: ToolbarButton[]
  right?: ReactNode
}

export const Toolbar: FC<Props> = ({ buttons, right }) => (
  <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
      {buttons.map((button) => (
        <button className="btn btn-ghost" onClick={button.onClick} disabled={button.disabled}>
          {button.icon}
          {button.text}
        </button>
      ))}
    </div>
    {right}
  </div>
)
