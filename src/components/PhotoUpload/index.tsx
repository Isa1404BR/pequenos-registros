import { useState, type ChangeEvent } from 'react'

import {
  AddPhotoButton,
  PreviewImage,
  RemoveButton,
  Slot,
  SlotsRow,
  UploadHint,
  UploadIcon,
  UploadLabel,
  Wrapper,
} from './styles'

export type PhotoUploadItem = {
  id: string
  previewUrl: string
}

type PhotoUploadProps = {
  photos: PhotoUploadItem[]
  onAdd: (file: File) => void
  onRemove: (id: string) => void
  maxPhotos?: number
  maxFileSize?: number
  disabled?: boolean
}

const DEFAULT_MAX_PHOTOS = 3
const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024

export function PhotoUpload({
  photos,
  onAdd,
  onRemove,
  maxPhotos = DEFAULT_MAX_PHOTOS,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  disabled,
}: PhotoUploadProps) {
  const [extraSlots, setExtraSlots] = useState(0)

  const emptySlots = photos.length === 0 ? Math.max(1, extraSlots) : extraSlots
  const canAddMore = photos.length + emptySlots < maxPhotos && emptySlots === 0

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (file.size > maxFileSize) return

    setExtraSlots((count) => Math.max(0, count - 1))
    onAdd(file)
  }

  return (
    <Wrapper>
      <SlotsRow>
        {photos.map((photo) => (
          <Slot key={photo.id}>
            <PreviewImage src={photo.previewUrl} alt="Foto do marco" />
            <RemoveButton
              type="button"
              onClick={() => onRemove(photo.id)}
              disabled={disabled}
              aria-label="Remover foto"
            >
              ×
            </RemoveButton>
          </Slot>
        ))}

        {Array.from({ length: Math.max(emptySlots, 0) }).map((_, index) => (
          <Slot key={`empty-${index}`}>
            <UploadLabel $disabled={disabled}>
              <UploadIcon aria-hidden="true">＋</UploadIcon>
              <UploadHint>Máx. 5 MB</UploadHint>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={disabled}
              />
            </UploadLabel>
          </Slot>
        ))}
      </SlotsRow>

      {canAddMore && (
        <AddPhotoButton
          type="button"
          onClick={() =>
            setExtraSlots((count) => Math.min(maxPhotos - photos.length, count + 1))
          }
          disabled={disabled}
        >
          + Adicionar outra foto
        </AddPhotoButton>
      )}
    </Wrapper>
  )
}
