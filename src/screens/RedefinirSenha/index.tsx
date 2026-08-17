import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '../../components/AuthLayout'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FormError } from '../../components/FormError'
import { updatePassword } from '../../services/auth.service'
import { Form } from './styles'

function RedefinirSenha() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)

    try {
      await updatePassword(password)
      navigate('/login')
    } catch {
      setError(
        'Não foi possível redefinir sua senha. O link pode ter expirado.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Redefinir senha">
      <Form onSubmit={handleSubmit}>
        <Input
          id="password"
          label="Nova senha"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          id="confirmPassword"
          label="Confirmar nova senha"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {error && <FormError>{error}</FormError>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar nova senha'}
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default RedefinirSenha
