-- profiles
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

create policy "profiles_insert_own" on public.profiles
  for insert with check (id = auth.uid());

create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());

-- babies
create policy "babies_select_owner_or_shared" on public.babies
  for select using (
    user_id = auth.uid()
    or (auth.jwt() ->> 'email') = any (shared_with)
  );

create policy "babies_insert_owner" on public.babies
  for insert with check (user_id = auth.uid());

create policy "babies_update_owner" on public.babies
  for update using (user_id = auth.uid());

create policy "babies_delete_owner" on public.babies
  for delete using (user_id = auth.uid());

-- baby_milestones
create policy "milestones_select_owner_or_shared" on public.baby_milestones
  for select using (
    exists (
      select 1 from public.babies b
      where b.id = baby_milestones.baby_id
        and (b.user_id = auth.uid() or (auth.jwt() ->> 'email') = any (b.shared_with))
    )
  );

create policy "milestones_insert_owner" on public.baby_milestones
  for insert with check (
    exists (
      select 1 from public.babies b
      where b.id = baby_milestones.baby_id
        and b.user_id = auth.uid()
    )
  );

create policy "milestones_update_owner" on public.baby_milestones
  for update using (
    exists (
      select 1 from public.babies b
      where b.id = baby_milestones.baby_id
        and b.user_id = auth.uid()
    )
  );

create policy "milestones_delete_owner" on public.baby_milestones
  for delete using (
    exists (
      select 1 from public.babies b
      where b.id = baby_milestones.baby_id
        and b.user_id = auth.uid()
    )
  );

-- photos
create policy "photos_select_owner_or_shared" on public.photos
  for select using (
    exists (
      select 1
      from public.baby_milestones m
      join public.babies b on b.id = m.baby_id
      where m.id = photos.milestone_id
        and (b.user_id = auth.uid() or (auth.jwt() ->> 'email') = any (b.shared_with))
    )
  );

create policy "photos_insert_owner" on public.photos
  for insert with check (
    exists (
      select 1
      from public.baby_milestones m
      join public.babies b on b.id = m.baby_id
      where m.id = photos.milestone_id
        and b.user_id = auth.uid()
    )
  );

create policy "photos_update_owner" on public.photos
  for update using (
    exists (
      select 1
      from public.baby_milestones m
      join public.babies b on b.id = m.baby_id
      where m.id = photos.milestone_id
        and b.user_id = auth.uid()
    )
  );

create policy "photos_delete_owner" on public.photos
  for delete using (
    exists (
      select 1
      from public.baby_milestones m
      join public.babies b on b.id = m.baby_id
      where m.id = photos.milestone_id
        and b.user_id = auth.uid()
    )
  );

-- bucket "photos" (caminho: {baby_id}/{milestone_id}/{arquivo})
create policy "photos_bucket_select_owner_or_shared" on storage.objects
  for select using (
    bucket_id = 'photos'
    and exists (
      select 1 from public.babies b
      where b.id::text = (storage.foldername(name))[1]
        and (b.user_id = auth.uid() or (auth.jwt() ->> 'email') = any (b.shared_with))
    )
  );

create policy "photos_bucket_insert_owner" on storage.objects
  for insert with check (
    bucket_id = 'photos'
    and exists (
      select 1 from public.babies b
      where b.id::text = (storage.foldername(name))[1]
        and b.user_id = auth.uid()
    )
  );

create policy "photos_bucket_update_owner" on storage.objects
  for update using (
    bucket_id = 'photos'
    and exists (
      select 1 from public.babies b
      where b.id::text = (storage.foldername(name))[1]
        and b.user_id = auth.uid()
    )
  );

create policy "photos_bucket_delete_owner" on storage.objects
  for delete using (
    bucket_id = 'photos'
    and exists (
      select 1 from public.babies b
      where b.id::text = (storage.foldername(name))[1]
        and b.user_id = auth.uid()
    )
  );
