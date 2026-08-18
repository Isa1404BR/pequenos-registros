import { useEffect, useRef, useState } from 'react'

import { parseIsoDate } from '../../utils/formatDate'
import {
  CalendarGrid,
  CalendarHeader,
  DayButton,
  DayLabel,
  Label,
  NavButton,
  Popover,
  Trigger,
  Wrapper,
} from './styles'

const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const MONTH_LABELS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDisplayDate(date: Date | null) {
  if (!date) return 'dd/mm/aaaa'

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}/${date.getFullYear()}`
}

function getMonthGrid(viewDate: Date) {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days: (Date | null)[] = []
  for (let i = 0; i < firstWeekday; i++) days.push(null)
  for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day))

  return days
}

type DatePickerProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function DatePicker({ id, label, value, onChange, disabled }: DatePickerProps) {
  const selectedDate = parseIsoDate(value)
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(selectedDate ?? new Date())
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectDay = (date: Date) => {
    onChange(toIsoDate(date))
    setIsOpen(false)
  }

  const handleToggle = () => {
    if (disabled) return
    setViewDate(selectedDate ?? new Date())
    setIsOpen((open) => !open)
  }

  const days = getMonthGrid(viewDate)

  return (
    <Wrapper ref={wrapperRef}>
      <Label htmlFor={id}>{label}</Label>
      <Trigger
        type="button"
        id={id}
        onClick={handleToggle}
        disabled={disabled}
        $filled={!!selectedDate}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {formatDisplayDate(selectedDate)}
      </Trigger>

      {isOpen && (
        <Popover role="dialog" aria-label="Selecionar data">
          <CalendarHeader>
            <NavButton
              type="button"
              onClick={() =>
                setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
              }
              aria-label="Mês anterior"
            >
              ‹
            </NavButton>
            <span>
              {MONTH_LABELS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <NavButton
              type="button"
              onClick={() =>
                setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
              }
              aria-label="Próximo mês"
            >
              ›
            </NavButton>
          </CalendarHeader>

          <CalendarGrid>
            {WEEKDAY_LABELS.map((weekday, index) => (
              <DayLabel key={`weekday-${index}`}>{weekday}</DayLabel>
            ))}

            {days.map((date, index) => (
              <DayButton
                key={date ? toIsoDate(date) : `empty-${index}`}
                type="button"
                disabled={!date}
                $selected={!!date && !!selectedDate && toIsoDate(date) === toIsoDate(selectedDate)}
                onClick={() => date && handleSelectDay(date)}
              >
                {date ? date.getDate() : ''}
              </DayButton>
            ))}
          </CalendarGrid>
        </Popover>
      )}
    </Wrapper>
  )
}
