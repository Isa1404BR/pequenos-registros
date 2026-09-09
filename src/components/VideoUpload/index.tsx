import { useState, type ChangeEvent, type KeyboardEvent } from 'react'

import {
  MAX_VIDEO_DURATION,
  MAX_VIDEO_SIZE,
  captureVideoPoster,
  readVideoMetadata,
} from '../../utils/videoMedia'

import {
  ErrorText,
  HelperText,
  PreviewVideo,
  PreviewWrapper,
  RemoveButton,
  RemoveTagButton,
  Tag,
  TagInput,
  TagList,
  UploadHint,
  UploadIcon,
  UploadLabel,
  Wrapper,
} from './styles'

export type VideoUploadItem = {
  previewUrl: string
  posterUrl?: string | null
  tags: string[]
}

type VideoUploadProps = {
  video: VideoUploadItem | null
  onAdd: (file: File, poster: Blob | null) => void
  onRemove: () => void
  onTagsChange: (tags: string[]) => void
  availableTags?: string[]
  disabled?: boolean
}

const MAX_SIZE_MB = Math.round(MAX_VIDEO_SIZE / (1024 * 1024))

export function VideoUpload({
  video,
  onAdd,
  onRemove,
  onTagsChange,
  availableTags = [],
  disabled,
}: VideoUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState('')

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    setError(null)

    if (!file) return

    if (!file.type.startsWith('video/')) {
      setError('Envie um arquivo de vídeo.')
      return
    }

    if (file.size > MAX_VIDEO_SIZE) {
      setError(`O vídeo deve ter no máximo ${MAX_SIZE_MB} MB.`)
      return
    }

    setIsProcessing(true)
    try {
      let poster: Blob | null = null

      try {
        const { duration } = await readVideoMetadata(file)

        if (Number.isFinite(duration) && duration > MAX_VIDEO_DURATION + 0.5) {
          setError(`O vídeo deve ter no máximo ${MAX_VIDEO_DURATION} segundos.`)
          return
        }

        poster = await captureVideoPoster(file)
      } catch {
        // Este navegador não decodifica o formato; ainda assim permitimos o
        // envio (sem miniatura) e mostramos um aviso na hora de exibir.
      }

      onAdd(file, poster)
    } finally {
      setIsProcessing(false)
    }
  }

  const addTag = (rawTag: string) => {
    const tag = rawTag.trim()
    if (!tag || !video || video.tags.includes(tag)) {
      setTagInput('')
      return
    }

    onTagsChange([...video.tags, tag])
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    if (!video) return
    onTagsChange(video.tags.filter((current) => current !== tag))
  }

  const handleTagInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag(tagInput)
    }
  }

  return (
    <Wrapper>
      <HelperText>
        Você pode adicionar 1 vídeo, de até {MAX_VIDEO_DURATION} segundos e{' '}
        {MAX_SIZE_MB} MB.
      </HelperText>

      {video ? (
        <>
          <PreviewWrapper>
            <PreviewVideo
              src={video.previewUrl}
              poster={video.posterUrl ?? undefined}
              controls
              preload="metadata"
            />
            <RemoveButton
              type="button"
              onClick={onRemove}
              disabled={disabled}
              aria-label="Remover vídeo"
            >
              ×
            </RemoveButton>
          </PreviewWrapper>

          <TagList>
            {video.tags.map((tag) => (
              <Tag key={tag}>
                {tag}
                <RemoveTagButton
                  type="button"
                  onClick={() => removeTag(tag)}
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
            list="video-tag-suggestions"
            placeholder="Adicionar tag"
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={handleTagInputKeyDown}
            onBlur={() => addTag(tagInput)}
            disabled={disabled}
          />

          <datalist id="video-tag-suggestions">
            {availableTags.map((tag) => (
              <option key={tag} value={tag} />
            ))}
          </datalist>
        </>
      ) : (
        <UploadLabel $disabled={disabled || isProcessing}>
          <UploadIcon aria-hidden="true">▶</UploadIcon>
          <UploadHint>{isProcessing ? 'Processando...' : 'Adicionar vídeo'}</UploadHint>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={disabled || isProcessing}
          />
        </UploadLabel>
      )}

      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  )
}
