import { useState, type ChangeEvent, type KeyboardEvent } from 'react'

import {
  AddPhotoButton,
  PreviewImage,
  RemoveButton,
  RemoveTagButton,
  Slot,
  SlotImageWrapper,
  SlotsRow,
  Tag,
  TagInput,
  TagList,
  UploadHint,
  UploadIcon,
  UploadLabel,
  Wrapper,
} from './styles'

export type PhotoUploadItem = {
  id: string
  previewUrl: string
  tags: string[]
}

type PhotoUploadProps = {
  photos: PhotoUploadItem[]
  onAdd: (file: File) => void
  onRemove: (id: string) => void
  onTagsChange: (id: string, tags: string[]) => void
  availableTags?: string[]
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
  onTagsChange,
  availableTags = [],
  maxPhotos = DEFAULT_MAX_PHOTOS,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  disabled,
}: PhotoUploadProps) {
  const [extraSlots, setExtraSlots] = useState(0)
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({})

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

  const addTag = (photo: PhotoUploadItem, rawTag: string) => {
    const tag = rawTag.trim()
    if (!tag || photo.tags.includes(tag)) return

    onTagsChange(photo.id, [...photo.tags, tag])
    setTagInputs((prev) => ({ ...prev, [photo.id]: '' }))
  }

  const removeTag = (photo: PhotoUploadItem, tag: string) => {
    onTagsChange(
      photo.id,
      photo.tags.filter((current) => current !== tag),
    )
  }

  const handleTagInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    photo: PhotoUploadItem,
  ) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag(photo, tagInputs[photo.id] ?? '')
    }
  }

  return (
    <Wrapper>
      <SlotsRow>
        {photos.map((photo) => (
          <Slot key={photo.id}>
            <SlotImageWrapper>
              <PreviewImage src={photo.previewUrl} alt="Foto do marco" />
              <RemoveButton
                type="button"
                onClick={() => onRemove(photo.id)}
                disabled={disabled}
                aria-label="Remover foto"
              >
                ×
              </RemoveButton>
            </SlotImageWrapper>

            <TagList>
              {photo.tags.map((tag) => (
                <Tag key={tag}>
                  {tag}
                  <RemoveTagButton
                    type="button"
                    onClick={() => removeTag(photo, tag)}
                    disabled={disabled}
                    aria-label={`Remover tag ${tag}`}
                  >
                    ×
                  </RemoveTagButton>
                </Tag>
              ))}
            </TagList>

            <TagInput
              type="text"
              list="photo-tag-suggestions"
              placeholder="Adicionar tag"
              value={tagInputs[photo.id] ?? ''}
              onChange={(event) =>
                setTagInputs((prev) => ({ ...prev, [photo.id]: event.target.value }))
              }
              onKeyDown={(event) => handleTagInputKeyDown(event, photo)}
              onBlur={() => addTag(photo, tagInputs[photo.id] ?? '')}
              disabled={disabled}
            />
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

      <datalist id="photo-tag-suggestions">
        {availableTags.map((tag) => (
          <option key={tag} value={tag} />
        ))}
      </datalist>
    </Wrapper>
  )
}
