import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 480px;
  margin: 0 auto;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`

export const OptionButton = styled.button`
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

export const OptionIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.125rem;
`
