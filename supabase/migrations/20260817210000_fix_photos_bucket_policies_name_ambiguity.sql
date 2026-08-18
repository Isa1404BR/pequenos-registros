-- As policies originais usavam `storage.foldername(name)` dentro de um EXISTS
-- que também faz FROM public.babies b — como babies também tem uma coluna
-- `name`, o Postgres resolvia `name` para `b.name` (nome do bebê) em vez de
-- `storage.objects.name` (caminho do arquivo), fazendo o EXISTS nunca bater
-- e bloqueando todo insert/select/update/delete no bucket via RLS.

alter policy "photos_bucket_select_owner_or_shared" on storage.objects
  using (
    bucket_id = 'photos'
    and exists (
      select 1 from public.babies b
      where b.id::text = (storage.foldername(storage.objects.name))[1]
        and (b.user_id = auth.uid() or (auth.jwt() ->> 'email') = any (b.shared_with))
    )
  );

alter policy "photos_bucket_insert_owner" on storage.objects
  with check (
    bucket_id = 'photos'
    and exists (
      select 1 from public.babies b
      where b.id::text = (storage.foldername(storage.objects.name))[1]
        and b.user_id = auth.uid()
    )
  );

alter policy "photos_bucket_update_owner" on storage.objects
  using (
    bucket_id = 'photos'
    and exists (
      select 1 from public.babies b
      where b.id::text = (storage.foldername(storage.objects.name))[1]
        and b.user_id = auth.uid()
    )
  );

alter policy "photos_bucket_delete_owner" on storage.objects
  using (
    bucket_id = 'photos'
    and exists (
      select 1 from public.babies b
      where b.id::text = (storage.foldername(storage.objects.name))[1]
        and b.user_id = auth.uid()
    )
  );
