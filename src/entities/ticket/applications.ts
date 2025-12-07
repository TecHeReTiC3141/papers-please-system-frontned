export enum ApplicationStatus {
  Active = 'active',
  Rejected = 'rejected',
  Approved = 'approved'
}

type ApplicationStatusConfig = { label: string; className: string; borderColor: string }

export const statusConfig: Record<ApplicationStatus, ApplicationStatusConfig> = {
  [ApplicationStatus.Active]: {
    label: 'Active',
    className: 'status-primary',
    borderColor: 'border-primary'
  },
  [ApplicationStatus.Approved]: {
    label: 'Active',
    className: 'status-accent',
    borderColor: 'border-accent'
  },
  [ApplicationStatus.Rejected]: {
    label: 'Active',
    className: 'status-error',
    borderColor: 'border-error'
  }
}
