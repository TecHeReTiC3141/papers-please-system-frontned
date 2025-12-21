import { useTranslation } from 'react-i18next'
import { ApplicationStatus } from '../applications'

type ApplicationStatusConfig = { label: string; className: string; borderColor: string }

export const useApplicationStatusConfig = (): Record<ApplicationStatus, ApplicationStatusConfig> => {
  const { t } = useTranslation()

  return {
    [ApplicationStatus.Active]: {
      label: t('applications.status.active'),
      className: 'status-primary',
      borderColor: 'border-primary'
    },
    [ApplicationStatus.Approved]: {
      label: t('applications.status.approved'),
      className: 'status-accent',
      borderColor: 'border-accent'
    },
    [ApplicationStatus.Rejected]: {
      label: t('applications.status.rejected'),
      className: 'status-error',
      borderColor: 'border-error'
    }
  }
}
