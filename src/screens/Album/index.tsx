import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { VideoPlayer } from '../../components/VideoPlayer'
import { useAuth } from '../../hooks/useAuth'
import { useBaby } from '../../hooks/useBaby'
import { useMilestones } from '../../hooks/useMilestones'
import { useAlbumPhotos } from '../../hooks/usePhotos'
import { formatDisplayDate } from '../../utils/formatDate'

import {
  Actions,
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
  ShareButton,
  ShareFeedback,
  TitleRow,
  Title,
  ViewButton,
  Wrapper,
} from './styles'

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function Album() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: baby } = useBaby()
  const { data: milestones = [] } = useMilestones(baby?.id)
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)

  const handleShareAlbum = async () => {
    if (!baby) return

    const link = `${window.location.origin}/album/publico/${baby.id}`
    const title = `Álbum de ${baby.nickname || baby.name}`

    if (navigator.share) {
      try {
        await navigator.share({ title, url: link })
      } catch (error) {
        if ((error as Error).name === 'AbortError') return
      }
      return
    }

    try {
      await navigator.clipboard.writeText(link)
      setShareFeedback('Link copiado!')
    } catch {
      setShareFeedback(link)
    }

    setTimeout(() => setShareFeedback(null), 3000)
  }

  const registeredMilestones = [...milestones]
    .filter((milestone) => milestone.event_date)
    .sort((a, b) =>
      (a.event_date as string).localeCompare(b.event_date as string),
    )

  const milestoneIds = registeredMilestones.map((milestone) => milestone.id)
  const { data: photosByMilestone } = useAlbumPhotos(milestoneIds)

  if (!baby) return null

  return (
    <Wrapper>
      <TitleRow>
        <Title>Registros de {baby.nickname || baby.name}</Title>
        <Actions>
          {user && (
            <ViewButton
              type="button"
              onClick={() => navigate(`/album/publico/${baby.id}`)}
              aria-label="Visualizar álbum"
              title="Visualizar como quem recebe o link"
            >
              <EyeIcon />
            </ViewButton>
          )}
          <ShareButton
            type="button"
            onClick={handleShareAlbum}
            aria-label="Compartilhar álbum"
          >
            🔗
          </ShareButton>
        </Actions>
      </TitleRow>

      {shareFeedback && <ShareFeedback>{shareFeedback}</ShareFeedback>}

      {registeredMilestones.length === 0 && (
        <EmptyState>Nenhum marco registrado ainda.</EmptyState>
      )}

      {registeredMilestones.map((milestone) => {
        const photos = photosByMilestone?.get(milestone.id) ?? []

        return (
          <Card key={milestone.id}>
            <CardHeaderRow>
              <MilestoneTitle>{milestone.title}</MilestoneTitle>
              <MilestoneDate>
                {formatDisplayDate(milestone.event_date)}
              </MilestoneDate>
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
                    {photos.map((photo) =>
                      photo.media_type === 'video' ? (
                        <VideoPlayer
                          key={photo.id}
                          src={photo.url}
                          poster={photo.posterUrl ?? undefined}
                        />
                      ) : (
                        <Photo
                          key={photo.id}
                          src={photo.url}
                          alt={milestone.title}
                        />
                      ),
                    )}
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
