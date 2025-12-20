import { useGetTickets } from '@/features/tickets/model'
import { TicketsBoard, TicketsFilters, TicketsTable } from '@/features/tickets/ui'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbTable, TbLayoutGrid } from 'react-icons/tb'

export function TicketsPage() {
  const { t } = useTranslation()
  const fetchTickets = useGetTickets()

  const [view, setView] = useState<'table' | 'board'>(() => {
    return (localStorage.getItem('tickets_view') as 'table' | 'board') ?? 'table'
  })

  const tickets = useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets
  })

  useEffect(() => {
    localStorage.setItem('tickets_view', view)
  }, [view])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t('tickets.title')}</h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('table')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 border transition cursor-pointer ${
              view === 'table' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TbTable size={18} />
            {t('tickets.view.table')}
          </button>

          <button
            onClick={() => setView('board')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 border transition cursor-pointer ${
              view === 'board' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <TbLayoutGrid size={18} />
            {t('tickets.view.board')}
          </button>
        </div>
      </div>

      <TicketsFilters />

      {view === 'table' ? (
        <TicketsTable tickets={tickets.data?.items ?? []} loading={tickets.isPending} />
      ) : (
        <TicketsBoard tickets={tickets.data?.items ?? []} loading={tickets.isPending} />
      )}
    </div>
  )
}
