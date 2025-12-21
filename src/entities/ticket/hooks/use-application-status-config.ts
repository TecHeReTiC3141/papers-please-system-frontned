import { useTranslation } from 'react-i18next'
import { ApplicationStatus } from '../types'

type ApplicationStatusConfig = { label: string; className: string; borderColor: string; ringColor: string }

export const useApplicationStatusConfig = (): Record<ApplicationStatus, ApplicationStatusConfig> => {
  const { t } = useTranslation()

  return {
    [ApplicationStatus.Active]: {
      label: t('applications.status.active'),
      className: 'status-primary',
      borderColor: 'border-primary',
      ringColor: 'ring-primary'
    },
    [ApplicationStatus.Approved]: {
      label: t('applications.status.approved'),
      className: 'status-accent',
      borderColor: 'border-accent',
      ringColor: 'ring-accent'
    },
    [ApplicationStatus.Rejected]: {
      label: t('applications.status.rejected'),
      className: 'status-error',
      borderColor: 'border-error',
      ringColor: 'ring-error'
    },
    [ApplicationStatus.Closed]: {
      label: 'applications.status.closed',
      className: 'status-base-content',
      borderColor: 'border-base-content',
      ringColor: 'ring-base-content'
    }
  }
}
