import { useParams } from 'react-router-dom'

import { usePublicAlbumPhotos, usePublicBaby, usePublicMilestones } from '../../hooks/usePublicAlbum'
import { formatDisplayDate } from '../../utils/formatDate'
import {
  Card,
  CardBody,
  CardHeaderRow,
  Description,
  EmptyState,
  MilestoneDate,
  MilestoneTitle,
  Photo,
  PhotoList,
  Title,
  Wrapper,
} from './styles'

function AlbumPublico() {
  const { babyId } = useParams<{ babyId: string }>()
  const { data: baby, isLoading: isLoadingBaby } = usePublicBaby(babyId)
  const { data: milestones = [] } = usePublicMilestones(babyId)

  const registeredMilestones = [...milestones]
    .filter((milestone) => milestone.event_date)
    .sort((a, b) => (a.event_date as string).localeCompare(b.event_date as string))

  const milestoneIds = registeredMilestones.map((milestone) => milestone.id)
  const { data: photosByMilestone } = usePublicAlbumPhotos(milestoneIds)

  if (isLoadingBaby) return null
  if (!baby) return <Wrapper><EmptyState>Álbum não encontrado.</EmptyState></Wrapper>

  return (
    <Wrapper>
      <Title>Registros de {baby.nickname || baby.name}</Title>

      {registeredMilestones.length === 0 && (
        <EmptyState>Nenhum marco registrado ainda.</EmptyState>
      )}

      {registeredMilestones.map((milestone) => {
        const photos = photosByMilestone?.get(milestone.id) ?? []

        return (
          <Card key={milestone.id}>
            <CardHeaderRow>
              <MilestoneTitle>{milestone.title}</MilestoneTitle>
              <MilestoneDate>{formatDisplayDate(milestone.event_date)}</MilestoneDate>
            </CardHeaderRow>

            {(milestone.description || photos.length > 0) && (
              <CardBody>
                {photos.length > 0 && (
                  <PhotoList>
                    {photos.map((photo) => (
                      <Photo key={photo.id} src={photo.url} alt={milestone.title} />
                    ))}
                  </PhotoList>
                )}
                {milestone.description && (
                  <Description>{milestone.description}</Description>
                )}
              </CardBody>
            )}
          </Card>
        )
      })}
    </Wrapper>
  )
}

export default AlbumPublico
