import styled from 'styled-components'

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
`

export const Brand = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.125rem;
`

export const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  padding: 0;

  span {
    display: block;
    height: 2px;
    width: 18px;
    background: ${({ theme }) => theme.colors.text};
    border-radius: ${({ theme }) => theme.radii.pill};
  }
`
