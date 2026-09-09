import { useState } from 'react'

import { Fallback, Player } from './styles'

type VideoPlayerProps = {
  src: string
  poster?: string
  className?: string
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <Fallback className={className}>
        Seu dispositivo não consegue exibir este vídeo.
      </Fallback>
    )
  }

  return (
    <Player
      className={className}
      src={src}
      poster={poster}
      controls
      preload="none"
      onError={() => setFailed(true)}
    />
  )
}
