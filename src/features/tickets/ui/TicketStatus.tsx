import { TicketStatus } from '@/entities/ticket'
import { statusConfig } from '@/entities/ticket/constants'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

type TicketStatusProps = {
  status: TicketStatus
}

export const TicketStatusBadge = ({ status }: TicketStatusProps) => {
  const { t } = useTranslation()
  const cfg = statusConfig[status]

  if (!cfg) return status

  return (
    <div className="flex items-center gap-x-3">
      <div className={classNames('status', cfg.className)}></div> {t(cfg.label)}
    </div>
  )
}
