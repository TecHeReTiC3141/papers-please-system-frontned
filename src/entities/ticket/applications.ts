export enum ApplicationStatus {
  Active = 'active',
  Rejected = 'rejected',
  Approved = 'approved'
}

type ApplicationStatusConfig = { label: string; className: string; borderColor: string }

export const statusConfig: Record<ApplicationStatus, ApplicationStatusConfig> = {
  [ApplicationStatus.Active]: {
    label: 'applications.status.active',
    className: 'status-primary',
    borderColor: 'border-primary'
  },
  [ApplicationStatus.Approved]: {
    label: 'applications.status.approved',
    className: 'status-accent',
    borderColor: 'border-accent'
  },
  [ApplicationStatus.Rejected]: {
    label: 'applications.status.rejected',
    className: 'status-error',
    borderColor: 'border-error'
  }
}
