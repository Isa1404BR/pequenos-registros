import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  text-align: left;
`

export const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
`

export const Trigger = styled.button<{ $filled: boolean }>`
  border: 1.5px solid transparent;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: 1rem;
  font-family: inherit;
  font-style: ${({ $filled }) => ($filled ? 'normal' : 'italic')};
  color: ${({ theme, $filled }) => ($filled ? theme.colors.text : `${theme.colors.text}99`)};
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Popover = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.xs});
  right: 0;
  z-index: 10;
  width: 280px;
  max-width: calc(100vw - ${({ theme }) => theme.spacing.xl});
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.md};
`

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const NavButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.pill};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
`

export const DayLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.text}99;
`

export const DayButton = styled.button<{ $selected: boolean }>`
  aspect-ratio: 1;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  cursor: pointer;
  visibility: hidden;

  &:not(:disabled) {
    visibility: visible;
  }

  &:not(:disabled):hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.background};
  }
`
