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
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const Brand = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
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
