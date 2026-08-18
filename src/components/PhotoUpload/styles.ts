import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const SlotsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Slot = styled.div`
  position: relative;
  width: 100%;
  min-height: 120px;
`

export const UploadLabel = styled.label<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  height: 100%;
  min-height: 120px;
  border: 1.5px dashed ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme, $disabled }) => ($disabled ? theme.colors.surface : theme.colors.background)};
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

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 120px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.md};
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
`

export const AddPhotoButton = styled.button`
  align-self: flex-start;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
