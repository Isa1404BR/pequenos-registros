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
  height: auto;
  border-radius: ${({ theme }) => theme.radii.md};
`

export const Video = styled.video`
  width: 100%;
  max-height: 420px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: #000;
`

export const SearchRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: inherit;
  font-size: 0.9375rem;
`

export const TagChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.8125rem;
`

export const RemoveChipButton = styled.button`
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
`

export const FilteredGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

export const PhotoFigure = styled.figure`
  margin: 0;
  position: relative;
`

export const DownloadButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(74, 40, 33, 0.55);
  color: #fff;
  cursor: pointer;

  &:hover {
    background: rgba(74, 40, 33, 0.75);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`
