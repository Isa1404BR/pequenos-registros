-- Allow a milestone media row to be either a photo or a single short video.
-- `poster_path` holds the storage path of a JPEG thumbnail generated on the
-- client for videos (null for photos).

alter table public.photos
  add column media_type text not null default 'photo'
    check (media_type in ('photo', 'video')),
  add column poster_path text;

-- get_public_photos returns `setof public.photos`, so the new columns are
-- exposed to the public album automatically. Storage policies already cover
-- every object in the `photos` bucket, posters included.
