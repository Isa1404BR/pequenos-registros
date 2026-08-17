import 'styled-components'
import type { Theme } from './theme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- augmenta a interface do tema padrão do styled-components
  export interface DefaultTheme extends Theme {}
}
