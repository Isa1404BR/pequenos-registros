import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { useBaby } from '../../hooks/useBaby'
import { useMilestones } from '../../hooks/useMilestones'
import { useAlbumPhotos } from '../../hooks/usePhotos'
import { formatDisplayDate } from '../../utils/formatDate'
import {
  Card,
  CardBody,
  CardHeaderRow,
  Description,
  EditButton,
  EmptyState,
  MilestoneDate,
  MilestoneTitle,
  Photo,
  PhotoList,
  Title,
  Wrapper,
} from './styles'

function Album() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: baby } = useBaby()
  const { data: milestones = [] } = useMilestones(baby?.id)

  const registeredMilestones = [...milestones]
    .filter((milestone) => milestone.event_date)
    .sort((a, b) => (a.event_date as string).localeCompare(b.event_date as string))

  const milestoneIds = registeredMilestones.map((milestone) => milestone.id)
  const { data: photosByMilestone } = useAlbumPhotos(milestoneIds)

  if (!baby) return null

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
              {user && (
                <EditButton
                  type="button"
                  onClick={() => navigate(`/album/marcos/${milestone.id}`)}
                  aria-label={`Editar ${milestone.title}`}
                >
                  ✎
                </EditButton>
              )}
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

export default Album
