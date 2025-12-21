import { useTranslation } from 'react-i18next'
import { TicketStatus } from '../types'

type TicketStatusConfig = { label: string; className: string; reason: string }

export const useStatusConfig = (): Record<TicketStatus, TicketStatusConfig> => {
  const { t } = useTranslation()

  return {
    [TicketStatus.OPEN]: {
      label: t('ticket.status.open'),
      className: '',
      reason: t('ticket.reason.open')
    },
    [TicketStatus.IN_PROGRESS]: {
      label: t('ticket.status.inProgress'),
      className: 'status-primary',
      reason: t('ticket.reason.inProgress')
    },
    [TicketStatus.NEED_INFO]: {
      label: t('ticket.status.needInfo'),
      className: 'status-warning',
      reason: t('ticket.reason.needInfo')
    },
    [TicketStatus.CLOSED]: {
      label: t('ticket.status.rejected'),
      className: 'status-success',
      reason: t('ticket.reason.rejected')
    },
    [TicketStatus.REJECTED]: {
      label: t('ticket.status.closed'),
      className: 'status-error',
      reason: t('ticket.reason.closed')
    }
  }
}
