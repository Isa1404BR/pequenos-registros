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
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;

  ${({ theme, $variant = 'primary' }) =>
    $variant === 'primary'
      ? css`
          background: ${theme.colors.primary};
          color: ${theme.colors.text};
          box-shadow: ${theme.shadows.sm};

          &:hover:not(:disabled) {
            box-shadow: ${theme.shadows.md};
            transform: translateY(-1px);
          }
        `
      : css`
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          border: 1.5px solid ${theme.colors.primary};

          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
          }
        `}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
