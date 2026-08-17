import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(74, 40, 33, 0.35);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
  z-index: 20;
`

export const Panel = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(80vw, 280px);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  transition: transform 0.25s ease;
  z-index: 21;
`

export const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.75rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: 0;
`

export const StyledNavLink = styled(NavLink)`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  transition: background 0.15s ease;

  &.active {
    background: ${({ theme }) => theme.colors.primary};
  }

  &:not(.active):hover {
    background: ${({ theme }) => theme.colors.background};
  }
`

export const LogoutButton = styled.button`
  margin-top: auto;
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`
