import styled from 'styled-components'

export const Player = styled.video`
  width: 100%;
  max-height: 420px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #000;
`

export const Fallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 160px;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text}99;
  font-size: 0.875rem;
`
