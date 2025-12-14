import classNames from 'classnames'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { FaCheck, FaXmark } from 'react-icons/fa6'

type DetailItem = {
  label: string
  value: ReactNode
  fieldKey?: string
}

type DetailsListProps = {
  items: DetailItem[]
  inspectorMode?: boolean
}

export function DetailsList({ items, inspectorMode = false }: DetailsListProps) {
  const [wrongFields, setWrongFields] = useState<Set<string>>(new Set())

  const toggleField = (key: string) => {
    setWrongFields((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-y-2 gap-x-4 items-center">
      {items.map((item) => {
        const isWrong = inspectorMode && item.fieldKey && wrongFields.has(item.fieldKey)

        return (
          <div key={item.label} className="contents">
            {/* Label */}
            <span className={classNames('text-sm', isWrong ? 'text-red-400' : 'text-gray-400')}>{item.label}</span>

            {/* Value */}
            <div className={classNames(isWrong && 'text-red-400')}>{item.value}</div>

            {inspectorMode && item.fieldKey ? (
              <button
                type="button"
                onClick={() => toggleField(item.fieldKey!)}
                className="btn btn-ghost btn-xs opacity-50 hover:opacity-100"
              >
                {isWrong ? (
                  <FaCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <FaXmark className="w-4 h-4 text-red-400" />
                )}
              </button>
            ) : (
              <span />
            )}
          </div>
        )
      })}
    </div>
  )
}
