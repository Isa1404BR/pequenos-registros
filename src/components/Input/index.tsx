import type { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  text-align: left;
`

const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
`

const StyledInput = styled.input`
  border: 1.5px solid transparent;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: 1rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text}99;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
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
