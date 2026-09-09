/**
 * Tipos de domínio da aplicação — fonte única de verdade.
 *
 * Derivados do schema (`database.types.ts`) sempre que possível, para não
 * duplicar a forma das tabelas. Só divergem do schema quando a aplicação
 * tem um contrato mais estreito (ex.: `media_type`).
 */
import type { Database } from './database.types'

type Row<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Profile = Row<'profiles'>

export type Baby = Row<'babies'>

export type Milestone = Row<'baby_milestones'>

/** No banco é `text` com CHECK; aqui estreitamos para os valores válidos. */
export type MediaType = 'photo' | 'video'

export type Photo = Omit<Row<'photos'>, 'media_type'> & {
  media_type: MediaType
}
