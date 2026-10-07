-- Ejecuta esto en Supabase > SQL Editor
create table if not exists public.items (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.items enable row level security;

-- Politicas abiertas para pruebas (restringir cuando agreguemos autenticacion)
create policy "items_select" on public.items for select using (true);
create policy "items_insert" on public.items for insert with check (true);
create policy "items_update" on public.items for update using (true);
create policy "items_delete" on public.items for delete using (true);
