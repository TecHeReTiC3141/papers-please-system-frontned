import type { BaseEntity } from '../common'

export enum Region {
  ORVECH_VONOR = 'ORVECH_VONOR',
  EAST_GRESTIN = 'EAST_GRESTIN',
  PARADIZNA = 'PARADIZNA'
}

export type Upk = BaseEntity & {
  name: string
  region: Region
}
