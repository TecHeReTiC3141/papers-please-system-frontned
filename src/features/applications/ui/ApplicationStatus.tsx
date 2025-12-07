import { statusConfig, type ApplicationStatus } from '@/entities/ticket/applications'
import classNames from 'classnames'

type ApplicationStatusProps = {
  status: ApplicationStatus
}

export const ApplicationStatusBadge = ({ status }: ApplicationStatusProps) => {
  const cfg = statusConfig[status]

  if (!cfg) return status

  return (
    <div className="flex items-center gap-x-3">
      <div className={classNames('status', cfg.className)}></div> {cfg.label}
    </div>
  )
}
