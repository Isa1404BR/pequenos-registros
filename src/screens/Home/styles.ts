import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const PhotoWrapper = styled.label`
  width: 160px;
  height: 160px;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  border: none;

  input {
    display: none;
  }
`

export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const PhotoPlaceholder = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
`
