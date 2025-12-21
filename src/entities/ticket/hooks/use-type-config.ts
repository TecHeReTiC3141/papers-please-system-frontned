import { useTranslation } from 'react-i18next'
import { MdApartment, MdDescription, MdGavel, MdPublic, MdSyncProblem } from 'react-icons/md'
import { TicketType } from '../types'

export const useTypeConfig = () => {
  const { t } = useTranslation()

  return {
    [TicketType.EXTERNAL]: {
      label: t('ticket.type.external'),
      iconColor: 'text-blue-500',
      blColor: 'border-blue-500',
      icon: MdPublic
    },
    [TicketType.INTERNAL]: {
      label: t('ticket.type.internal'),
      iconColor: 'text-green-500',
      blColor: 'border-green-500',
      icon: MdApartment
    },
    [TicketType.ARREST]: {
      label: t('ticket.type.arrest'),
      iconColor: 'text-red-500',
      blColor: 'border-red-500',
      icon: MdGavel
    },
    [TicketType.CROSSCHECK]: {
      label: t('ticket.type.crosscheck'),
      iconColor: 'text-purple-500',
      blColor: 'border-purple-500',
      icon: MdSyncProblem
    },
    [TicketType.APPEAL]: {
      label: t('ticket.type.appeal'),
      iconColor: 'text-yellow-500',
      blColor: 'border-yellow-500',
      icon: MdDescription
    }
  }
}
