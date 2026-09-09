import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '../../components/AuthLayout'
import { Button } from '../../components/Button'
import { FormError } from '../../components/FormError'
import { Input } from '../../components/Input'
import { useCreateBaby } from '../../hooks/useBaby'

import { Form } from './styles'

export function CadastroBebe() {
  const navigate = useNavigate()
  const createBaby = useCreateBaby()

  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    try {
      await createBaby.mutateAsync({ name, nickname, birthDate })
      void navigate('/home')
    } catch {
      setError('Não foi possível cadastrar o bebê. Tente novamente.')
    }
  }

  return (
    <AuthLayout title="Quem é o seu bebê?">
      <Form onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Nome"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          id="nickname"
          label="Apelido"
          type="text"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <Input
          id="birthDate"
          label="Data de nascimento"
          type="date"
          required
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
        />

        {error && <FormError>{error}</FormError>}

        <Button type="submit" disabled={createBaby.isPending}>
          {createBaby.isPending ? 'Salvando...' : 'Próximo passo'}
        </Button>
      </Form>
    </AuthLayout>
  )
}
