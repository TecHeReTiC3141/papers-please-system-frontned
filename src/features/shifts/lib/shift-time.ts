export const SEVEN_HOURS_MS = 7 * 60 * 60 * 1000

export function getShiftDurationMs(startTime: string) {
  return Date.now() - new Date(startTime).getTime()
}

export function canCloseShift(startTime: string) {
  return getShiftDurationMs(startTime) >= SEVEN_HOURS_MS
}

export function formatShiftDuration(startTime: string) {
  const diffMs = getShiftDurationMs(startTime)

  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  return `${hours}h ${minutes}m`
}
