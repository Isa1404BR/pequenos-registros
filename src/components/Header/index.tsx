import { useState } from 'react'

import { SideMenu } from '../SideMenu'
import { Brand, MenuButton, Wrapper } from './styles'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Wrapper>
      <Brand>Pequenos registros</Brand>

      <MenuButton
        type="button"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Abrir menu"
      >
        <span />
        <span />
        <span />
      </MenuButton>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </Wrapper>
  )
}
