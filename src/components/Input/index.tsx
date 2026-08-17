import type { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  text-align: left;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
`

const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: 1rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
}

export function Input({ label, id, ...props }: InputProps) {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput id={id} {...props} />
    </Wrapper>
  )
}
