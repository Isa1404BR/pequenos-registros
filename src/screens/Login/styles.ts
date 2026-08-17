import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ForgotPasswordLink = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  align-self: flex-end;
`
