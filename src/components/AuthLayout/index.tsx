import type { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
`

const Card = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
`

const Brand = styled.h1`
  font-size: 1.375rem;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`

type AuthLayoutProps = {
  title: string
  children: ReactNode
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <Wrapper>
      <Card>
        <Brand>Pequenos registros</Brand>
        <Title>{title}</Title>
        {children}
      </Card>
    </Wrapper>
  )
}
