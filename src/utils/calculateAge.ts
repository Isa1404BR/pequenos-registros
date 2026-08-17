export function calculateBabyAge(birthDate: string, today = new Date()) {
  const birth = new Date(`${birthDate}T00:00:00`)

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()

  if (days < 0) {
    months -= 1
    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate()
    days += daysInPreviousMonth
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  if (years > 0) {
    return `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${months === 1 ? 'mês' : 'meses'}`
  }

  if (months > 0) {
    return `${months} ${months === 1 ? 'mês' : 'meses'} e ${days} ${days === 1 ? 'dia' : 'dias'}`
  }

  return `${days} ${days === 1 ? 'dia' : 'dias'}`
}
