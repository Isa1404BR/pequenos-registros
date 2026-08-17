import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '../../components/AuthLayout'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FormError } from '../../components/FormError'
import { signUp } from '../../services/auth.service'
import { Actions, Form } from './styles'

function Cadastro() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setInfo(null)

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)

    try {
      const { session } = await signUp({ name, email, password })

      if (session) {
        navigate('/home')
        return
      }

      setInfo(
        'Cadastro realizado! Verifique seu e-mail para confirmar a conta.',
      )
    } catch {
      setError('Não foi possível concluir o cadastro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Cadastro">
      <Form onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Nome completo"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          id="password"
          label="Criar senha"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          id="confirmPassword"
          label="Confirmar senha"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {error && <FormError>{error}</FormError>}
        {info && <p>{info}</p>}

        <Actions>
          <Button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
          <Button
            type="button"
            $variant="secondary"
            onClick={() => navigate('/login')}
          >
            Já possuo cadastro
          </Button>
        </Actions>
      </Form>
    </AuthLayout>
  )
}

export default Cadastro
