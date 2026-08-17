import { type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { signOut } from '../../services/auth.service'
import {
  useBaby,
  useBabyPhotoUrl,
  useUpdateBabyPhoto,
} from '../../hooks/useBaby'
import { PhotoImage, PhotoPlaceholder, PhotoWrapper, Wrapper } from './styles'

const MAX_PHOTO_SIZE = 5 * 1024 * 1024

function Home() {
  const navigate = useNavigate()
  const { data: baby } = useBaby()
  const { data: photoUrl } = useBabyPhotoUrl(baby?.photo_url)
  const updateBabyPhoto = useUpdateBabyPhoto()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file || !baby) return

    if (file.size > MAX_PHOTO_SIZE) {
      event.target.value = ''
      return
    }

    updateBabyPhoto.mutate({ babyId: baby.id, photo: file })
  }

  return (
    <Wrapper>
      <PhotoWrapper>
        {photoUrl ? (
          <PhotoImage src={photoUrl} alt={baby?.name ?? 'Foto do bebê'} />
        ) : (
          <PhotoPlaceholder>
            {updateBabyPhoto.isPending ? 'Enviando...' : 'Adicionar foto'}
          </PhotoPlaceholder>
        )}
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </PhotoWrapper>

      <p>{baby?.name}</p>

      <Button type="button" onClick={handleLogout}>
        Sair
      </Button>
    </Wrapper>
  )
}

export default Home
