type CompressImageOptions = {
  maxDimension?: number
  quality?: number
}

const DEFAULT_MAX_DIMENSION = 2000
const DEFAULT_QUALITY = 0.8

function canEncode(mimeType: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  return canvas.toDataURL(mimeType).startsWith(`data:${mimeType}`)
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Não foi possível ler a imagem.'))
    }
    image.src = url
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality)
  })
}

/**
 * Redimensiona a imagem para no máximo `maxDimension` px no maior lado e
 * recomprime em WebP (com fallback para JPEG). Se algo falhar ou o resultado
 * ficar maior que o original, devolve o arquivo original sem alterações.
 */
export async function compressImage(
  file: File,
  { maxDimension = DEFAULT_MAX_DIMENSION, quality = DEFAULT_QUALITY }: CompressImageOptions = {},
): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') {
    return file
  }

  try {
    const image = await loadImage(file)
    const largestSide = Math.max(image.naturalWidth, image.naturalHeight)
    const scale = largestSide > maxDimension ? maxDimension / largestSide : 1

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(image.naturalWidth * scale)
    canvas.height = Math.round(image.naturalHeight * scale)

    const context = canvas.getContext('2d')
    if (!context) return file

    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    const targetType = canEncode('image/webp') ? 'image/webp' : 'image/jpeg'
    const blob = await canvasToBlob(canvas, targetType, quality)

    if (!blob || blob.size >= file.size) return file

    const extension = targetType === 'image/webp' ? 'webp' : 'jpg'
    const baseName = file.name.replace(/\.[^./\\]+$/, '') || 'foto'

    return new File([blob], `${baseName}.${extension}`, {
      type: targetType,
      lastModified: Date.now(),
    })
  } catch {
    return file
  }
}
