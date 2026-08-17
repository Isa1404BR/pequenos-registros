import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { signOut } from '../../services/auth.service'

function Home() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div>
      <p>Home</p>
      <Button type="button" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  )
}

export default Home
