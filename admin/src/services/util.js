import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now()
}

export function fbToEntities(values, DataRecord) {
  return new OrderedMap(
    values.map((value) => [value.id, new DataRecord(value)])
  )
}
