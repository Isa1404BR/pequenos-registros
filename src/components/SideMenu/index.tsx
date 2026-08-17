import { useNavigate } from 'react-router-dom'

import { signOut } from '../../services/auth.service'
import {
  CloseButton,
  LogoutButton,
  Overlay,
  Panel,
  StyledNavLink,
} from './styles'

type SideMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} aria-hidden="true" />
      <Panel $isOpen={isOpen} aria-label="Menu de navegação">
        <CloseButton type="button" onClick={onClose} aria-label="Fechar menu">
          ×
        </CloseButton>

        <StyledNavLink to="/home" onClick={onClose}>
          Home
        </StyledNavLink>
        <StyledNavLink to="/album" onClick={onClose}>
          Álbum
        </StyledNavLink>
        <StyledNavLink to="/familia" onClick={onClose}>
          Família
        </StyledNavLink>
        <StyledNavLink to="/configuracoes" onClick={onClose}>
          Configurações
        </StyledNavLink>

        <LogoutButton type="button" onClick={handleLogout}>
          Sair
        </LogoutButton>
      </Panel>
    </>
  )
}
