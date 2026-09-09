/**
 * Camada fina sobre o cliente do Supabase.
 *
 * Todo service passa por aqui em vez de repetir o padrão
 * `const { data, error } = await ...; if (error) throw error; return data`.
 * O erro sai sempre como `SupabaseServiceError`, com o nome da operação.
 */
import { supabase } from './supabase'

export const PHOTOS_BUCKET = 'photos'

const SIGNED_URL_TTL_SECONDS = 60 * 60

type SupabaseErrorLike = { message: string }

type SupabaseResponse<T> = {
  data: T | null
  error: SupabaseErrorLike | null
}

export class SupabaseServiceError extends Error {
  readonly context: string

  constructor(context: string, cause: SupabaseErrorLike) {
    super(`${context}: ${cause.message}`)
    this.name = 'SupabaseServiceError'
    this.context = context
    this.cause = cause
  }
}

/** Executa uma query PostgREST (tabelas ou `rpc`) e devolve `data` já validado. */
export async function run<T>(
  query: PromiseLike<SupabaseResponse<T>>,
  context: string,
): Promise<T> {
  const { data, error } = await query

  if (error) throw new SupabaseServiceError(context, error)

  return data as T
}

/** Executa uma operação de Storage (upload/remove) normalizando o erro. */
export async function runStorage<T>(
  operation: PromiseLike<SupabaseResponse<T>>,
  context: string,
): Promise<T> {
  const { data, error } = await operation

  if (error) throw new SupabaseServiceError(context, error)

  return data as T
}

/** URL assinada de um objeto do bucket `photos` (TTL de 1 hora). */
export async function createPhotoSignedUrl(
  path: string,
  options?: { download?: string },
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(PHOTOS_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS, options)

  if (error) throw new SupabaseServiceError('createPhotoSignedUrl', error)

  return data.signedUrl
}
