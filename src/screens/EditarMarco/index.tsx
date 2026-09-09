import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../components/Button'
import { DatePicker } from '../../components/DatePicker'
import { FormError } from '../../components/FormError'
import { Input } from '../../components/Input'
import { PhotoUpload, type PhotoUploadItem } from '../../components/PhotoUpload'
import { Textarea } from '../../components/Textarea'
import { VideoUpload } from '../../components/VideoUpload'
import { useBaby } from '../../hooks/useBaby'
import { useMilestone, useUpdateMilestone } from '../../hooks/useMilestones'
import {
  useBabyTags,
  useDeleteMilestonePhoto,
  useMilestonePhotos,
  useUpdatePhotoTags,
  useUploadMilestonePhoto,
  useUploadMilestoneVideo,
  type MilestonePhoto,
} from '../../hooks/usePhotos'
import type { Baby, Milestone } from '../../types'

import { FieldRow, Form, Title, Wrapper } from './styles'

type NewPhoto = {
  id: string
  file: File
  previewUrl: string
  tags: string[]
}

type NewVideo = {
  file: File
  poster: Blob | null
  previewUrl: string
  tags: string[]
}

export function EditarMarco() {
  const { id } = useParams<{ id: string }>()

  const { data: baby } = useBaby()
  const { data: milestone } = useMilestone(id)
  const { data: existingPhotos = [] } = useMilestonePhotos(id)

  if (!baby || !milestone) return null

  return (
    <MarcoForm
      baby={baby}
      milestone={milestone}
      existingPhotos={existingPhotos}
    />
  )
}

type MarcoFormProps = {
  baby: Baby
  milestone: Milestone
  existingPhotos: MilestonePhoto[]
}

function MarcoForm({ baby, milestone, existingPhotos }: MarcoFormProps) {
  const navigate = useNavigate()

  const updateMilestone = useUpdateMilestone()
  const uploadPhoto = useUploadMilestonePhoto()
  const uploadVideo = useUploadMilestoneVideo()
  const deletePhoto = useDeleteMilestonePhoto()
  const updatePhotoTags = useUpdatePhotoTags()
  const { data: availableTags = [] } = useBabyTags(baby.id)

  const [title, setTitle] = useState(milestone.title)
  const [description, setDescription] = useState(milestone.description ?? '')
  const [eventDate, setEventDate] = useState(milestone.event_date ?? '')
  const [newPhotos, setNewPhotos] = useState<NewPhoto[]>([])
  const [newVideo, setNewVideo] = useState<NewVideo | null>(null)
  const [removedPhotoIds, setRemovedPhotoIds] = useState<string[]>([])
  const [tagOverrides, setTagOverrides] = useState<Record<string, string[]>>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      newPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl))
    }
  }, [newPhotos])

  useEffect(() => {
    return () => {
      if (newVideo) URL.revokeObjectURL(newVideo.previewUrl)
    }
  }, [newVideo])

  const keptExistingPhotos = existingPhotos.filter(
    (photo) => !removedPhotoIds.includes(photo.id),
  )

  const keptExistingImages = keptExistingPhotos.filter(
    (photo) => photo.media_type === 'photo',
  )
  const keptExistingVideo = keptExistingPhotos.find(
    (photo) => photo.media_type === 'video',
  )

  const photoItems: PhotoUploadItem[] = [
    ...keptExistingImages.map((photo) => ({
      id: photo.id,
      previewUrl: photo.url,
      tags: tagOverrides[photo.id] ?? photo.tags,
    })),
    ...newPhotos.map((photo) => ({
      id: photo.id,
      previewUrl: photo.previewUrl,
      tags: photo.tags,
    })),
  ]

  const videoItem = newVideo
    ? { previewUrl: newVideo.previewUrl, tags: newVideo.tags }
    : keptExistingVideo
      ? {
          previewUrl: keptExistingVideo.url,
          posterUrl: keptExistingVideo.posterUrl,
          tags: tagOverrides[keptExistingVideo.id] ?? keptExistingVideo.tags,
        }
      : null

  const handleAddPhoto = (file: File) => {
    setNewPhotos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
        tags: [],
      },
    ])
  }

  const handleAddVideo = (file: File, poster: Blob | null) => {
    setNewVideo({
      file,
      poster,
      previewUrl: URL.createObjectURL(file),
      tags: [],
    })
  }

  const handleVideoTagsChange = (tags: string[]) => {
    if (newVideo) {
      setNewVideo((prev) => (prev ? { ...prev, tags } : prev))
    } else if (keptExistingVideo) {
      setTagOverrides((prev) => ({ ...prev, [keptExistingVideo.id]: tags }))
    }
  }

  const handleRemoveVideo = () => {
    if (newVideo) {
      setNewVideo(null)
      return
    }
    if (keptExistingVideo) {
      setRemovedPhotoIds((prev) => [...prev, keptExistingVideo.id])
    }
  }

  const handleRemovePhoto = (photoId: string) => {
    if (newPhotos.some((photo) => photo.id === photoId)) {
      setNewPhotos((prev) => prev.filter((photo) => photo.id !== photoId))
    } else {
      setRemovedPhotoIds((prev) => [...prev, photoId])
    }
  }

  const handleTagsChange = (photoId: string, tags: string[]) => {
    if (newPhotos.some((photo) => photo.id === photoId)) {
      setNewPhotos((prev) =>
        prev.map((photo) =>
          photo.id === photoId ? { ...photo, tags } : photo,
        ),
      )
    } else {
      setTagOverrides((prev) => ({ ...prev, [photoId]: tags }))
    }
  }

  const isSaving =
    updateMilestone.isPending ||
    uploadPhoto.isPending ||
    uploadVideo.isPending ||
    deletePhoto.isPending ||
    updatePhotoTags.isPending

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle) {
      setError('Dê um nome para o marco.')
      return
    }

    if (!eventDate) {
      setError('Selecione a data do marco.')
      return
    }

    if (!trimmedDescription && photoItems.length === 0 && !videoItem) {
      setError('Adicione uma foto, um vídeo ou uma descrição para o marco.')
      return
    }

    try {
      await updateMilestone.mutateAsync({
        id: milestone.id,
        babyId: baby.id,
        title: trimmedTitle,
        description: trimmedDescription || null,
        eventDate,
      })

      await Promise.all([
        ...removedPhotoIds
          .map((photoId) =>
            existingPhotos.find((photo) => photo.id === photoId),
          )
          .filter((photo): photo is MilestonePhoto => !!photo)
          .map((photo) => deletePhoto.mutateAsync(photo)),
        ...newPhotos.map((photo) =>
          uploadPhoto.mutateAsync({
            babyId: baby.id,
            milestoneId: milestone.id,
            file: photo.file,
            tags: photo.tags,
          }),
        ),
        ...(newVideo
          ? [
              uploadVideo.mutateAsync({
                babyId: baby.id,
                milestoneId: milestone.id,
                file: newVideo.file,
                poster: newVideo.poster,
                tags: newVideo.tags,
              }),
            ]
          : []),
        ...Object.entries(tagOverrides)
          .filter(([photoId]) => !removedPhotoIds.includes(photoId))
          .map(([photoId, tags]) =>
            updatePhotoTags.mutateAsync({
              photoId,
              tags,
              milestoneId: milestone.id,
              babyId: baby.id,
            }),
          ),
      ])

      void navigate('/album')
    } catch {
      setError('Não foi possível salvar o marco. Tente novamente.')
    }
  }

  return (
    <Wrapper>
      <Title>Edição/registro de marco</Title>

      <Form onSubmit={handleSubmit}>
        <FieldRow>
          <Input
            id="title"
            label="Nome do marco"
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <DatePicker
            id="eventDate"
            label="Data"
            value={eventDate}
            onChange={setEventDate}
            disabled={isSaving}
          />
        </FieldRow>

        <PhotoUpload
          photos={photoItems}
          onAdd={handleAddPhoto}
          onRemove={handleRemovePhoto}
          onTagsChange={handleTagsChange}
          availableTags={availableTags}
          disabled={isSaving}
        />

        <VideoUpload
          video={videoItem}
          onAdd={handleAddVideo}
          onRemove={handleRemoveVideo}
          onTagsChange={handleVideoTagsChange}
          availableTags={availableTags}
          disabled={isSaving}
        />

        <Textarea
          id="description"
          placeholder="Digite algo sobre as fotos adicionadas. Podem ser detalhes do registro, como você se sentiu no dia, ou até uma mensagem para seu bebê ler futuramente."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={isSaving}
        />

        {error && <FormError>{error}</FormError>}

        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </Form>
    </Wrapper>
  )
}
