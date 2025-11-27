import type { BaseEntity } from '../common'

export interface Upk extends BaseEntity {
  name: string
  address?: string
  createdAt: string
  updatedAt: string
}
