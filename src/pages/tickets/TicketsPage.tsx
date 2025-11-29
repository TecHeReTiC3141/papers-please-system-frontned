import { TicketsBoard, TicketsFilters, TicketsTable } from '@/features/tickets/ui'
import { useState } from 'react'
import { TbTable } from 'react-icons/tb'
import { TbLayoutGrid } from 'react-icons/tb'

export function TicketsPage() {
  const [view, setView] = useState<'table' | 'board'>('table')

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tickets</h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('table')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 border transition ${
              view === 'table' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TbTable size={18} />
            Table
          </button>

          <button
            onClick={() => setView('board')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 border transition ${
              view === 'board' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TbLayoutGrid size={18} />
            Board
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <TicketsFilters />

      {/* CONTENT */}
      {view === 'table' ? <TicketsTable tickets={[]} /> : <TicketsBoard />}
    </div>
  )
}
