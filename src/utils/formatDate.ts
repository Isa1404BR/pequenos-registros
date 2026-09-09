export function parseIsoDate(value: string | null | undefined) {
  if (!value) return null

  const [year, month, day] = value.split('-').map(Number)
  if (year === undefined || month === undefined || day === undefined) return null
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return null

  return new Date(year, month - 1, day)
}

export function formatDisplayDate(value: string | null | undefined) {
  const date = parseIsoDate(value)
  if (!date) return null

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}/${date.getFullYear()}`
}
