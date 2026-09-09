import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const HelperText = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text}99;
`

export const ErrorText = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`

export const PreviewWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const PreviewVideo = styled.video`
  width: 100%;
  max-height: 360px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #000;
`

export const RemoveButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  width: 28px;
  height: 28px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const UploadLabel = styled.label<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  min-height: 120px;
  border: 1.5px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.surface : theme.colors.background};
  }

  input {
    display: none;
  }
`

export const UploadIcon = styled.span`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const UploadHint = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text}99;
`
