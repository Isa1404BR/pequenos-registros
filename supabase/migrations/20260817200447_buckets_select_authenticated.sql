create policy "buckets_select_authenticated" on storage.buckets
  for select
  to authenticated
  using (id = 'photos');
