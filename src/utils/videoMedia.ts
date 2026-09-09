export const MAX_VIDEO_SIZE = 20 * 1024 * 1024
export const MAX_VIDEO_DURATION = 60

const POSTER_MAX_DIMENSION = 1280
const POSTER_QUALITY = 0.8

export type VideoMetadata = {
  duration: number
  width: number
  height: number
}

function loadVideo(file: File) {
  return new Promise<{ video: HTMLVideoElement; revoke: () => void }>((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.muted = true
    video.playsInline = true
    video.src = url

    const revoke = () => URL.revokeObjectURL(url)

    video.onloadedmetadata = () => resolve({ video, revoke })
    video.onerror = () => {
      revoke()
      reject(new Error('Não foi possível ler o vídeo.'))
    }
  })
}

export async function readVideoMetadata(file: File): Promise<VideoMetadata> {
  const { video, revoke } = await loadVideo(file)
  const metadata: VideoMetadata = {
    duration: video.duration,
    width: video.videoWidth,
    height: video.videoHeight,
  }
  revoke()
  return metadata
}

/**
 * Extrai um quadro do início do vídeo e devolve um JPEG reduzido para servir
 * como thumbnail na grade do álbum (evita ter que carregar o vídeo inteiro).
 */
export async function captureVideoPoster(file: File): Promise<Blob> {
  const { video, revoke } = await loadVideo(file)

  try {
    await new Promise<void>((resolve, reject) => {
      video.onseeked = () => resolve()
      video.onerror = () => reject(new Error('Não foi possível gerar a miniatura do vídeo.'))
      video.currentTime = Math.min(0.1, (video.duration || 1) / 2)
    })

    const largestSide = Math.max(video.videoWidth, video.videoHeight)
    const scale = largestSide > POSTER_MAX_DIMENSION ? POSTER_MAX_DIMENSION / largestSide : 1

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(video.videoWidth * scale)
    canvas.height = Math.round(video.videoHeight * scale)

    const context = canvas.getContext('2d')
    if (!context) throw new Error('Não foi possível gerar a miniatura do vídeo.')

    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((result) => resolve(result), 'image/jpeg', POSTER_QUALITY)
    })

    if (!blob) throw new Error('Não foi possível gerar a miniatura do vídeo.')

    return blob
  } finally {
    revoke()
  }
}
