import { useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { useBaby } from '../../hooks/useBaby'
import { useAllMilestones, useSaveMilestones } from '../../hooks/useMilestones'
import {
  AddButton,
  AddInput,
  AddRow,
  Card,
  Checkbox,
  MilestoneRow,
  Title,
  Wrapper,
} from './styles'

function EditarMarcos() {
  const navigate = useNavigate()
  const { data: baby } = useBaby()
  const { data: milestones } = useAllMilestones(baby?.id)
  const saveMilestones = useSaveMilestones()

  const [overrides, setOverrides] = useState<Record<string, boolean>>({})
  const [newTitles, setNewTitles] = useState<string[]>([])
  const [newTitleInput, setNewTitleInput] = useState('')

  const toggleExisting = (id: string, currentlyChecked: boolean) => {
    setOverrides((prev) => ({ ...prev, [id]: !currentlyChecked }))
  }

  const removeNewTitle = (index: number) => {
    setNewTitles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddTitle = () => {
    const title = newTitleInput.trim()
    if (!title) return

    setNewTitles((prev) => [...prev, title])
    setNewTitleInput('')
  }

  const handleAddKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddTitle()
    }
  }

  const handleSave = async () => {
    if (!baby || !milestones) return

    const toggles = milestones
      .filter((milestone) => milestone.id in overrides)
      .map((milestone) => ({
        id: milestone.id,
        isHidden: !overrides[milestone.id],
      }))

    await saveMilestones.mutateAsync({ babyId: baby.id, toggles, newTitles })
    navigate('/album')
  }

  if (!milestones) return null

  return (
    <Wrapper>
      <Title>Quais marcos você quer registrar?</Title>

      <Card>
        {milestones.map((milestone) => {
          const checked = overrides[milestone.id] ?? !milestone.is_hidden

          return (
            <MilestoneRow
              key={milestone.id}
              type="button"
              onClick={() => toggleExisting(milestone.id, checked)}
            >
              {milestone.title}
              <Checkbox $checked={checked} aria-hidden="true">
                {checked && '✓'}
              </Checkbox>
            </MilestoneRow>
          )
        })}

        {newTitles.map((title, index) => (
          <MilestoneRow
            key={`new-${title}-${index}`}
            type="button"
            onClick={() => removeNewTitle(index)}
          >
            {title}
            <Checkbox $checked aria-hidden="true">
              ✓
            </Checkbox>
          </MilestoneRow>
        ))}

        <AddRow>
          <AddInput
            type="text"
            placeholder="Adicionar outro marco"
            value={newTitleInput}
            onChange={(event) => setNewTitleInput(event.target.value)}
            onKeyDown={handleAddKeyDown}
          />
          <AddButton
            type="button"
            onClick={handleAddTitle}
            disabled={!newTitleInput.trim()}
            aria-label="Adicionar marco"
          >
            +
          </AddButton>
        </AddRow>
      </Card>

      <Button
        type="button"
        onClick={handleSave}
        disabled={saveMilestones.isPending}
      >
        {saveMilestones.isPending ? 'Salvando...' : 'Salvar'}
      </Button>
    </Wrapper>
  )
}

export default EditarMarcos
