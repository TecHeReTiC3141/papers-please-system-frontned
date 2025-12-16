import type { RowSelection, SortConfig, TableColumn, ToolbarButton } from './types'
import { DEFAULT_PAGE_SIZE } from './constants'
import { useSearchParams } from 'react-router'
import { Toolbar } from './Toolbar'
import { Pagination } from './Pagination'
import { useState, type ReactNode } from 'react'
import { TbSortDescending, TbSortAscending } from 'react-icons/tb'
import { get } from 'lodash'
import { Loader } from '../Loader'

type Props<T extends { id: string | number }> = {
  data: T[] | null
  loading?: boolean
  loadingText?: string
  columns: TableColumn<T>[]
  toolbarButtons?: ToolbarButton[]
  pageSize?: number
  showTotal?: boolean
  emptyMessage?: ReactNode
  rowSelection?: RowSelection<T>
  filterable?: boolean
  showEmpty?: boolean
}

export const Table = <T extends { id: number | string }>({
  data,
  loading = false,
  loadingText = '',
  columns,
  toolbarButtons = [],
  pageSize = DEFAULT_PAGE_SIZE,
  showTotal = true,
  emptyMessage = 'No data found',
  rowSelection = {
    isEnabled: false
  },
  filterable = true,
  showEmpty = false
}: Props<T>) => {
  const [searchParams] = useSearchParams()
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const [filterColumn, setFilterColumn] = useState<string>('all')
  const [filterValue, setFilterValue] = useState('')

  const { isEnabled: selectable } = rowSelection

  const currentPage = +(searchParams.get('page') ?? 1)

  if (loading) return <Loader text={loadingText} />

  if (!data || (data.length === 0 && !showEmpty))
    return <div className="text-center py-2 text-gray-500">{emptyMessage}</div>

  const filteredData =
    !filterValue.trim() || !filterable
      ? data
      : data.filter((entry) => {
          if (filterColumn === 'all') {
            return columns.some((column) => {
              const value = get(entry, column.dataIndex, null)
              if (value === null || value === undefined) return false

              const stringValue = String(value).toLowerCase()
              return stringValue.includes(filterValue.toLowerCase())
            })
          }
          const value = get(entry, filterColumn, null)
          if (value === null || value === undefined) return false

          const stringValue = String(value).toLowerCase()
          return stringValue.includes(filterValue.toLowerCase())
        })

  const sortedData = !sortConfig
    ? filteredData
    : [...filteredData].sort((a, b) => {
        const { key, direction } = sortConfig
        const aValue = get(a, key, null)
        const bValue = get(b, key, null)

        // Handle different data types
        if (aValue === null || aValue === undefined) return 1
        if (bValue === null || bValue === undefined) return -1

        let comparison = 0

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue)
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime()
        } else {
          comparison = String(aValue).localeCompare(String(bValue))
        }

        return direction === 'asc' ? comparison : -comparison
      })

  const totalPages = Math.ceil(sortedData.length / pageSize)
  const dataToShow = sortedData.slice(pageSize * (currentPage - 1), pageSize * currentPage)

  const renderCellContent = (entry: T, column: TableColumn<T>) => {
    if (column.render) {
      return column.render(entry)
    }

    const value = get(entry, column.dataIndex, null)
    return String(value)
  }

  const handleSort = (dataIndex: keyof T | string) => {
    setSortConfig({
      key: dataIndex,
      direction: sortConfig?.key === dataIndex ? (sortConfig.direction === 'asc' ? 'desc' : 'asc') : 'asc'
    })
  }

  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.isSortable || sortConfig?.key !== column.dataIndex) return null

    return sortConfig.direction === 'asc' ? (
      <TbSortAscending className="text-lg" />
    ) : (
      <TbSortDescending className="text-lg" />
    )
  }

  const extendedColumns = [...columns]

  // if (deleteAction) {
  //   extendedColumns.push({
  //     key: 'delete',
  //     label: '',
  //     dataIndex: 'delete',
  //     isSortable: false,
  //     render: (entry: T) => (
  //       <button
  //         className="btn btn-ghost btn-sm"
  //         onClick={() => {
  //           setEntryToDelete(entry.id)
  //           openConfirmDeleteModal()
  //         }}
  //       >
  //         <MdOutlineDelete className="text-lg" />
  //       </button>
  //     )
  //   })
  // }

  const filterableColumns = columns.filter((col) => col.isFilterable !== false)

  return (
    <>
      <div className="flex flex-col items-center gap-y-8">
        {(toolbarButtons.length > 0 || filterable) && (
          <div className="w-full flex justify-between items-center gap-4">
            <Toolbar
              buttons={toolbarButtons}
              right={
                filterable && (
                  <div className="flex items-center gap-2">
                    <select
                      value={filterColumn}
                      onChange={(e) => setFilterColumn(e.target.value)}
                      className="select select-bordered select-sm"
                    >
                      <option value="all">All Columns</option>
                      {filterableColumns.map((column) => (
                        <option key={column.key} value={column.dataIndex}>
                          {column.label}
                        </option>
                      ))}
                    </select>

                    <div className="join">
                      <input
                        type="text"
                        placeholder="Filter..."
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="input input-bordered input-sm  w-20 join-item"
                      />
                      {filterValue && (
                        <button className="btn btn-sm join-item" onClick={() => setFilterValue('')}>
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                )
              }
            />
          </div>
        )}

        <div className="overflow-x-auto rounded-lg shadow w-full">
          <table className="table table-zebra border border-base-content/5">
            <thead>
              <tr>
                {selectable && (
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      checked={rowSelection.selectedRows.length === dataToShow.length && dataToShow.length > 0}
                      onChange={(e) => {
                        rowSelection.setSelectedRows(e.target.checked ? dataToShow.map((item) => item.id) : [])
                      }}
                    />
                  </th>
                )}
                {extendedColumns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    onClick={() => {
                      if (column.isSortable) {
                        handleSort(column.dataIndex)
                      }
                    }}
                  >
                    <div className="flex items-center gap-x-1">
                      {column.label}
                      {column.isSortable && getSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataToShow.map((entry) => (
                <tr key={entry.id}>
                  {selectable && (
                    <td className="px-4 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={rowSelection.selectedRows.includes(entry.id)}
                        className="checkbox checkbox-primary checkbox-sm"
                        onChange={(event) => {
                          rowSelection.setSelectedRows((prev) =>
                            event.target.checked ? [...prev, entry.id] : prev.filter((id) => id !== entry.id)
                          )
                        }}
                      />
                    </td>
                  )}
                  {extendedColumns.map((column) => (
                    <td key={column.key} className="px-4 py-4 whitespace-nowrap text-sm">
                      {renderCellContent(entry, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-between items-center">
          <div></div>
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
          {showTotal && (
            <div className="text-sm">
              Showing {Math.min(pageSize * (currentPage - 1) + 1, sortedData.length)}-
              {Math.min(pageSize * currentPage, sortedData.length)} of {sortedData.length} entries
              {filterValue && filteredData && <span className="text-gray-500 ml-2">(filtered from {data.length})</span>}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
