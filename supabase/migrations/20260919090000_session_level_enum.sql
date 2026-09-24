-- `level` has no existing text+check column to convert (unlike `track`), so
-- it goes straight in as an enum: the allowed audience levels
-- (beginner/intermediate/advanced) become part of the schema instead of an
-- app-level convention, and `pnpm db:types` generates a union type for it
-- the same way it does for `session_track`.

create type public.session_level as enum (
  'beginner',
  'intermediate',
  'advanced'
);

-- Add nullable first: this is a brand-new column, so every existing row
-- needs a backfilled value before NOT NULL can be enforced.
alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions set level = 'beginner'     where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced'     where id = 'server-components-deep-dive';
update public.sessions set level = 'intermediate' where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'advanced'     where id = 'micro-frontends-2026';
update public.sessions set level = 'beginner'     where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner'     where id = 'closing-panel';

alter table public.sessions
  alter column level set not null;

-- No RLS change: the existing "Sessions are publicly readable" policy on
-- public.sessions is per row (`using (true)`), so it already covers the new
-- column for anon and authenticated.
