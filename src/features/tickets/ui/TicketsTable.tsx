import type { Ticket } from '@/entities/ticket'
import type { TableColumn } from '@/shared/ui/Table/types'
import { TicketStatusBadge } from './TicketStatus'
import { Table } from '@/shared/ui'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

type TicketsTableProps = {
  tickets: Ticket[] | null
  loading: boolean
}

export function TicketsTable({ tickets, loading }: TicketsTableProps) {
  const { t } = useTranslation()
  const columns: TableColumn<Ticket>[] = [
    {
      label: t('ID'),
      dataIndex: 'id',
      key: 'id',
      render: (ticket) => (
        <Link to={`/tickets/${ticket.id}`} className="link link-hover link-info">
          {ticket.id}
        </Link>
      )
    },
    {
      label: t('Title'),
      key: 'description',
      dataIndex: 'description'
    },
    {
      label: t('Status'),
      render: (ticket) => <TicketStatusBadge status={ticket.status} />,
      key: 'status',
      dataIndex: 'status'
    },
    {
      label: t('Priority'),
      key: 'priority',
      dataIndex: 'priority'
    },
    {
      label: t('Deadline'),
      key: 'deadlineAt',
      dataIndex: 'deadlineAt'
    }
  ]

  return (
    <div className="overflow-x-auto rounded-xl shadow">
      <Table<Ticket>
        columns={columns}
        data={tickets}
        loading={loading}
        loadingText={t('Loading tickets...')}
        rowSelection={{
          isEnabled: false
        }}
        filterable={false}
      />
    </div>
  )
}
