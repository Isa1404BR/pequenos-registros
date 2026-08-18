import { type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import {
  useBaby,
  useBabyPhotoUrl,
  useUpdateBabyPhoto,
} from '../../hooks/useBaby'
import { useMilestones } from '../../hooks/useMilestones'
import { calculateBabyAge } from '../../utils/calculateAge'
import { getNextMilestone } from '../../utils/getNextMilestone'
import {
  AgeText,
  BabyName,
  Card,
  CardTitle,
  InfoCard,
  MilestoneList,
  MilestonesCount,
  NextMilestoneRow,
  PhotoImage,
  PhotoPlaceholder,
  PhotoWrapper,
  Wrapper,
} from './styles'

const MAX_PHOTO_SIZE = 5 * 1024 * 1024

function Home() {
  const navigate = useNavigate()
  const { data: baby } = useBaby()
  const { data: photoUrl } = useBabyPhotoUrl(baby?.photo_url)
  const updateBabyPhoto = useUpdateBabyPhoto()
  const { data: milestones = [] } = useMilestones(baby?.id)

  const registeredMilestones = milestones.filter(
    (milestone) => milestone.event_date,
  )
  const nextMilestone = getNextMilestone(milestones)
  const lastRegisteredMilestones = [...registeredMilestones]
    .sort((a, b) => (b.event_date ?? '').localeCompare(a.event_date ?? ''))
    .slice(0, 3)

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file || !baby) return

    if (file.size > MAX_PHOTO_SIZE) {
      event.target.value = ''
      return
    }

    updateBabyPhoto.mutate({ babyId: baby.id, photo: file })
  }

  if (!baby) return null

  return (
    <Wrapper>
      <PhotoWrapper>
        {photoUrl ? (
          <PhotoImage src={photoUrl} alt={baby.name} />
        ) : (
          <PhotoPlaceholder>
            {updateBabyPhoto.isPending ? 'Enviando...' : 'Adicionar foto'}
          </PhotoPlaceholder>
        )}
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </PhotoWrapper>

      <InfoCard>
        <BabyName>{baby.nickname || baby.name}</BabyName>
        <AgeText>{calculateBabyAge(baby.birth_date)}</AgeText>
        <MilestonesCount>
          {registeredMilestones.length} de {milestones.length} marcos
          registrados
        </MilestonesCount>
      </InfoCard>

      {nextMilestone && (
        <Card>
          <CardTitle>Próximo marco</CardTitle>
          <NextMilestoneRow>
            <span>{nextMilestone.title}</span>
            <Button
              type="button"
              onClick={() => navigate(`/album/marcos/${nextMilestone.id}`)}
            >
              Registrar
            </Button>
          </NextMilestoneRow>
        </Card>
      )}

      {lastRegisteredMilestones.length > 0 && (
        <Card>
          <CardTitle>Últimos marcos registrados</CardTitle>
          <MilestoneList>
            {lastRegisteredMilestones.map((milestone) => (
              <li key={milestone.id}>{milestone.title}</li>
            ))}
          </MilestoneList>
        </Card>
      )}
    </Wrapper>
  )
}

export default Home
