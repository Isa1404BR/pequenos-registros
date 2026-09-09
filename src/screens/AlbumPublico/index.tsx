import { useMemo, useState, type KeyboardEvent } from 'react'
import { useParams } from 'react-router-dom'

import { VideoPlayer } from '../../components/VideoPlayer'
import type { MilestonePhoto } from '../../hooks/usePhotos'
import {
  getPublicPhotoDownloadUrl,
  usePublicAlbumPhotos,
  usePublicBaby,
  usePublicMilestones,
} from '../../hooks/usePublicAlbum'
import { formatDisplayDate } from '../../utils/formatDate'

import {
  Card,
  CardBody,
  CardHeaderRow,
  Description,
  DownloadButton,
  EmptyState,
  FilteredGrid,
  MilestoneDate,
  MilestoneTitle,
  Photo,
  PhotoFigure,
  PhotoList,
  RemoveChipButton,
  SearchInput,
  SearchRow,
  TagChip,
  TagChips,
  Title,
  Wrapper,
} from './styles'

function getDownloadFilename(storagePath: string) {
  const raw = storagePath.split('/').pop() ?? 'foto'
  const withoutUuid = raw.replace(/^[0-9a-f]{8}-[0-9a-f-]{27}-/i, '')

  return decodeURIComponent(withoutUuid || raw)
}

async function downloadPhoto(photo: MilestonePhoto) {
  const filename = getDownloadFilename(photo.storage_path)
  const url = await getPublicPhotoDownloadUrl(photo.storage_path, filename)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PublicMedia({ photo, alt }: { photo: MilestonePhoto; alt: string }) {
  return (
    <PhotoFigure>
      {photo.media_type === 'video' ? (
        <VideoPlayer src={photo.url} poster={photo.posterUrl ?? undefined} />
      ) : (
        <Photo src={photo.url} alt={alt} />
      )}
      <DownloadButton
        type="button"
        onClick={() => void downloadPhoto(photo)}
        aria-label="Baixar foto"
        title="Baixar"
      >
        <DownloadIcon />
      </DownloadButton>
    </PhotoFigure>
  )
}

function AlbumPublico() {
  const { babyId } = useParams<{ babyId: string }>()
  const { data: baby, isLoading: isLoadingBaby } = usePublicBaby(babyId)
  const { data: milestones = [] } = usePublicMilestones(babyId)

  const registeredMilestones = [...milestones]
    .filter((milestone) => milestone.event_date)
    .sort((a, b) =>
      (a.event_date as string).localeCompare(b.event_date as string),
    )

  const milestoneIds = registeredMilestones.map((milestone) => milestone.id)
  const { data: photosByMilestone } = usePublicAlbumPhotos(milestoneIds)

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const allPhotos = useMemo<MilestonePhoto[]>(
    () => (photosByMilestone ? [...photosByMilestone.values()].flat() : []),
    [photosByMilestone],
  )

  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    allPhotos.forEach((photo) => photo.tags.forEach((tag) => tags.add(tag)))

    return [...tags].sort((a, b) => a.localeCompare(b))
  }, [allPhotos])

  const addTag = (rawTag: string) => {
    const tag = rawTag.trim()
    if (!tag || selectedTags.includes(tag)) {
      setTagInput('')
      return
    }
    if (!availableTags.includes(tag)) return

    setSelectedTags((current) => [...current, tag])
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setSelectedTags((current) => current.filter((item) => item !== tag))
  }

  const handleTagInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag(tagInput)
    }
  }

  const filteredPhotos = allPhotos.filter((photo) =>
    photo.tags.some((tag) => selectedTags.includes(tag)),
  )

  if (isLoadingBaby) return null
  if (!baby)
    return (
      <Wrapper>
        <EmptyState>Álbum não encontrado.</EmptyState>
      </Wrapper>
    )

  const isFiltering = selectedTags.length > 0

  return (
    <Wrapper>
      <Title>Registros de {baby.nickname || baby.name}</Title>

      {availableTags.length > 0 && (
        <SearchRow>
          <SearchInput
            type="text"
            list="public-tag-suggestions"
            placeholder="Pesquisar registros por tag"
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={handleTagInputKeyDown}
            onBlur={() => addTag(tagInput)}
          />
          <datalist id="public-tag-suggestions">
            {availableTags
              .filter((tag) => !selectedTags.includes(tag))
              .map((tag) => (
                <option key={tag} value={tag} />
              ))}
          </datalist>

          {isFiltering && (
            <TagChips>
              {selectedTags.map((tag) => (
                <TagChip key={tag}>
                  {tag}
                  <RemoveChipButton
                    type="button"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remover tag ${tag}`}
                  >
                    ×
                  </RemoveChipButton>
                </TagChip>
              ))}
            </TagChips>
          )}
        </SearchRow>
      )}

      {isFiltering ? (
        filteredPhotos.length === 0 ? (
          <EmptyState>Nenhuma foto com as tags selecionadas.</EmptyState>
        ) : (
          <FilteredGrid>
            {filteredPhotos.map((photo) => (
              <PublicMedia
                key={photo.id}
                photo={photo}
                alt={selectedTags.join(', ')}
              />
            ))}
          </FilteredGrid>
        )
      ) : (
        <>
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
                </CardHeaderRow>

                {(milestone.description || photos.length > 0) && (
                  <CardBody>
                    {photos.length > 0 && (
                      <PhotoList>
                        {photos.map((photo) => (
                          <PublicMedia
                            key={photo.id}
                            photo={photo}
                            alt={milestone.title}
                          />
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
        </>
      )}
    </Wrapper>
  )
}

export default AlbumPublico
