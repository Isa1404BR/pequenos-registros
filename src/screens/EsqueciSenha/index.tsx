import { useState, type SubmitEvent } from 'react'

import { AuthLayout } from '../../components/AuthLayout'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FormError } from '../../components/FormError'
import { resetPassword } from '../../services/auth.service'
import { Form } from './styles'

function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await resetPassword(email)
      setSent(true)
    } catch {
      setError('Não foi possível enviar o e-mail de recuperação.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <AuthLayout title="Esqueci minha senha">
        <p>
          Se o e-mail informado estiver cadastrado, você vai receber um link
          para redefinir sua senha.
        </p>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Esqueci minha senha">
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

        {error && <FormError>{error}</FormError>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar link de recuperação'}
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default EsqueciSenha
