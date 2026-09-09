import { useState, type ChangeEvent } from 'react'

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
  UploadHint,
  UploadIcon,
  UploadLabel,
  Wrapper,
} from './styles'

export type VideoUploadItem = {
  previewUrl: string
  posterUrl?: string | null
}

type VideoUploadProps = {
  video: VideoUploadItem | null
  onAdd: (file: File, poster: Blob) => void
  onRemove: () => void
  disabled?: boolean
}

const MAX_SIZE_MB = Math.round(MAX_VIDEO_SIZE / (1024 * 1024))

export function VideoUpload({ video, onAdd, onRemove, disabled }: VideoUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    setError(null)

    if (!file) return

    if (file.type !== 'video/mp4') {
      setError('Envie um vídeo no formato .mp4.')
      return
    }

    if (file.size > MAX_VIDEO_SIZE) {
      setError(`O vídeo deve ter no máximo ${MAX_SIZE_MB} MB.`)
      return
    }

    setIsProcessing(true)
    try {
      const { duration } = await readVideoMetadata(file)

      if (!Number.isFinite(duration) || duration > MAX_VIDEO_DURATION + 0.5) {
        setError(`O vídeo deve ter no máximo ${MAX_VIDEO_DURATION} segundos.`)
        return
      }

      const poster = await captureVideoPoster(file)
      onAdd(file, poster)
    } catch {
      setError('Não foi possível processar o vídeo. Tente outro arquivo.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Wrapper>
      <HelperText>
        Você pode adicionar 1 vídeo .mp4, de até {MAX_VIDEO_DURATION} segundos e{' '}
        {MAX_SIZE_MB} MB.
      </HelperText>

      {video ? (
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
      ) : (
        <UploadLabel $disabled={disabled || isProcessing}>
          <UploadIcon aria-hidden="true">▶</UploadIcon>
          <UploadHint>{isProcessing ? 'Processando...' : 'Adicionar vídeo'}</UploadHint>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleFileChange}
            disabled={disabled || isProcessing}
          />
        </UploadLabel>
      )}

      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  )
}
