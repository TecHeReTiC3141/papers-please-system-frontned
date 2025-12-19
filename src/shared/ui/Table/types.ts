import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type ToolbarButton = {
  text: string
  icon: ReactNode
  onClick: () => void
  disabled?: boolean
}

export type TableColumn<T extends { id: string | number }> = {
  label: string
  render?: (entry: T) => ReactNode
  dataIndex: string
  isSortable?: boolean
  isFilterable?: boolean
  key: string
  showTotal?: boolean
}

export type RowSelection<T extends { id: string | number }> =
  | { isEnabled: false }
  | {
      isEnabled: true
      selectedRows: Array<T['id']>
      setSelectedRows: Dispatch<SetStateAction<Array<T['id']>>>
    }

export type SortConfig<T> = {
  key: keyof T | string
  direction: 'asc' | 'desc'
}

export type DeleteActionConfig = {
  text: string
  onDelete: (params: { id: number }) => Promise<void>
  deleteInProgress: boolean
}
