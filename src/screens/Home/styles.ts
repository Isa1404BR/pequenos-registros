import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 480px;
  margin: 0 auto;
`

export const PhotoWrapper = styled.label`
  width: 140px;
  height: 140px;
  border-radius: ${({ theme }) => theme.radii.pill};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 4px solid ${({ theme }) => theme.colors.surface};
  cursor: pointer;

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
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
`

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`

export const BabyName = styled.h1`
  font-size: 1.5rem;
`

export const AgeText = styled.p`
  font-style: italic;
  margin: 0;
  opacity: 0.85;
`

export const MilestonesCount = styled.span`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.secondary};
  font-size: 0.8125rem;
  font-weight: 600;
`

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

export const CardTitle = styled.h2`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`

export const NextMilestoneRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
`

export const MilestoneList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  li {
    padding-left: ${({ theme }) => theme.spacing.lg};
    position: relative;
    font-style: italic;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5em;
      width: 6px;
      height: 6px;
      border-radius: ${({ theme }) => theme.radii.pill};
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`
