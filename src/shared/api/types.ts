export type MultipleEntitiesResponse<T> = {
  items: T[]
  total: number
  limit: number
  offset: number
}
