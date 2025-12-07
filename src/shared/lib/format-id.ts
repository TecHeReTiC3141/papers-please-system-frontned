import type { BaseEntity } from '@/entities/common'

export const formatId = (entity: BaseEntity) => entity.id.split('-').at(-1)
