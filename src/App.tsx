import styled from 'styled-components'

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`

function App() {
  return <Title>Pequenos Registros</Title>
}

export default App
