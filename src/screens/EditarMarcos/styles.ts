import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 480px;
  margin: 0 auto;
`

export const Title = styled.h1`
  font-size: 1.25rem;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`

export const MilestoneRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.background};
  }
`

export const Checkbox = styled.span<{ $checked: boolean }>`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.75rem;
`

export const AddRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`

export const AddInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text}99;
  }

  &:focus {
    outline: none;
  }
`

export const AddButton = styled.button`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`
