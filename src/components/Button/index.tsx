import styled, { css } from 'styled-components'

type Variant = 'primary' | 'secondary'

export const Button = styled.button<{ $variant?: Variant }>`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  ${({ theme, $variant = 'primary' }) =>
    $variant === 'primary'
      ? css`
          background: ${theme.colors.text};
          color: ${theme.colors.background};
        `
      : css`
          background: transparent;
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.text};
        `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
