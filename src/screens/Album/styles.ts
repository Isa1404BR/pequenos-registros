import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 640px;
  margin: 0 auto;
`

export const Title = styled.h1`
  font-size: 1.25rem;
`

export const EmptyState = styled.p`
  opacity: 0.75;
  font-style: italic;
`

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

export const CardHeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const MilestoneTitle = styled.h2`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.text};
`

export const MilestoneDate = styled.span`
  font-style: italic;
  opacity: 0.8;
  font-size: 0.9375rem;
`

export const EditButton = styled.button`
  margin-left: auto;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.0625rem;
  line-height: 1;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.pill};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Description = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  white-space: pre-wrap;
`

export const PhotoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Photo = styled.img`
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.md};
`
