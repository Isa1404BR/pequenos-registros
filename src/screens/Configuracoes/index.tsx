import { useNavigate } from 'react-router-dom'

import { Card, OptionButton, OptionIcon, Wrapper } from './styles'

const options = [
  { label: 'Editar marcos', action: 'editar-marcos', route: '/configuracoes/marcos' },
  { label: 'Editar paleta de cores', action: 'editar-paleta-de-cores' },
  { label: 'Editar senha/email', action: 'editar-senha-email' },
  { label: 'Criar novo álbum', action: 'criar-novo-album' },
]

function Configuracoes() {
  const navigate = useNavigate()

  const handleOptionClick = (option: (typeof options)[number]) => {
    if (option.route) {
      navigate(option.route)
      return
    }

    console.log(`Configurações: ${option.action}`)
  }

  return (
    <Wrapper>
      <Card>
        {options.map((option) => (
          <OptionButton
            key={option.action}
            type="button"
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
            <OptionIcon aria-hidden="true">›</OptionIcon>
          </OptionButton>
        ))}
      </Card>
    </Wrapper>
  )
}

export default Configuracoes
