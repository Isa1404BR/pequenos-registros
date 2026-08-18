import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../components/Button'
import { DatePicker } from '../../components/DatePicker'
import { FormError } from '../../components/FormError'
import { Input } from '../../components/Input'
import { PhotoUpload, type PhotoUploadItem } from '../../components/PhotoUpload'
import { Textarea } from '../../components/Textarea'
import type { Baby } from '../../services/baby.service'
import type { Milestone } from '../../services/milestone.service'
import { useBaby } from '../../hooks/useBaby'
import { useMilestone, useUpdateMilestone } from '../../hooks/useMilestones'
import {
  useDeleteMilestonePhoto,
  useMilestonePhotos,
  useUploadMilestonePhoto,
  type MilestonePhoto,
} from '../../hooks/usePhotos'
import { FieldRow, Form, Title, Wrapper } from './styles'

type NewPhoto = {
  id: string
  file: File
  previewUrl: string
}

function EditarMarco() {
  const { id } = useParams<{ id: string }>()

  const { data: baby } = useBaby()
  const { data: milestone } = useMilestone(id)
  const { data: existingPhotos = [] } = useMilestonePhotos(id)

  if (!baby || !milestone) return null

  return (
    <MarcoForm baby={baby} milestone={milestone} existingPhotos={existingPhotos} />
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
  const deletePhoto = useDeleteMilestonePhoto()

  const [title, setTitle] = useState(milestone.title)
  const [description, setDescription] = useState(milestone.description ?? '')
  const [eventDate, setEventDate] = useState(milestone.event_date ?? '')
  const [newPhotos, setNewPhotos] = useState<NewPhoto[]>([])
  const [removedPhotoIds, setRemovedPhotoIds] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      newPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl))
    }
  }, [newPhotos])

  const keptExistingPhotos = existingPhotos.filter(
    (photo) => !removedPhotoIds.includes(photo.id),
  )

  const photoItems: PhotoUploadItem[] = [
    ...keptExistingPhotos.map((photo) => ({ id: photo.id, previewUrl: photo.url })),
    ...newPhotos.map((photo) => ({ id: photo.id, previewUrl: photo.previewUrl })),
  ]

  const handleAddPhoto = (file: File) => {
    setNewPhotos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), file, previewUrl: URL.createObjectURL(file) },
    ])
  }

  const handleRemovePhoto = (photoId: string) => {
    if (newPhotos.some((photo) => photo.id === photoId)) {
      setNewPhotos((prev) => prev.filter((photo) => photo.id !== photoId))
    } else {
      setRemovedPhotoIds((prev) => [...prev, photoId])
    }
  }

  const isSaving =
    updateMilestone.isPending || uploadPhoto.isPending || deletePhoto.isPending

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

    if (!trimmedDescription && photoItems.length === 0) {
      setError('Adicione uma foto ou uma descrição para o marco.')
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
          .map((photoId) => existingPhotos.find((photo) => photo.id === photoId))
          .filter((photo): photo is MilestonePhoto => !!photo)
          .map((photo) => deletePhoto.mutateAsync(photo)),
        ...newPhotos.map((photo) =>
          uploadPhoto.mutateAsync({
            babyId: baby.id,
            milestoneId: milestone.id,
            file: photo.file,
          }),
        ),
      ])

      navigate('/album')
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

export default EditarMarco
