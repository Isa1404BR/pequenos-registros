import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '../../components/AuthLayout'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FormError } from '../../components/FormError'
import { signIn } from '../../services/auth.service'
import { Actions, ForgotPasswordLink, Form } from './styles'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await signIn({ email, password })
      navigate('/home')
    } catch {
      setError('E-mail ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Login">
      <Form onSubmit={handleSubmit}>
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
          label="Senha"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <ForgotPasswordLink to="/esqueci-senha">
          Esqueci minha senha
        </ForgotPasswordLink>

        {error && <FormError>{error}</FormError>}

        <Actions>
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Login'}
          </Button>
          <Button
            type="button"
            $variant="secondary"
            onClick={() => navigate('/cadastro')}
          >
            Cadastre-se
          </Button>
        </Actions>
      </Form>
    </AuthLayout>
  )
}

export default Login
