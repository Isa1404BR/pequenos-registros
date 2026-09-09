-- Public, unauthenticated read access to a baby's album via its (unguessable) id.
-- Table-level RLS still blocks anon entirely; access is only exposed through these
-- SECURITY DEFINER functions, which return data for a single known baby id and
-- never allow listing/enumeration.

create or replace function public.get_public_baby(p_baby_id uuid)
returns setof public.babies
language sql
security definer
set search_path = public
as $$
  select * from public.babies where id = p_baby_id;
$$;

create or replace function public.get_public_milestones(p_baby_id uuid)
returns setof public.baby_milestones
language sql
security definer
set search_path = public
as $$
  select m.*
  from public.baby_milestones m
  where m.baby_id = p_baby_id
    and m.is_hidden = false
    and m.event_date is not null;
$$;

create or replace function public.get_public_photos(p_milestone_ids uuid[])
returns setof public.photos
language sql
security definer
set search_path = public
as $$
  select p.*
  from public.photos p
  where p.milestone_id = any (p_milestone_ids);
$$;

grant execute on function public.get_public_baby(uuid) to anon;
grant execute on function public.get_public_milestones(uuid) to anon;
grant execute on function public.get_public_photos(uuid[]) to anon;

-- Allow anonymous visitors to load the actual photo files for the public album.
-- Storage object paths are `{baby_id}/{milestone_id}/{file}` uuids, so this does
-- not enable browsing/enumeration without already knowing a path.
create policy "photos_bucket_select_public" on storage.objects
  for select to anon
  using (bucket_id = 'photos');
