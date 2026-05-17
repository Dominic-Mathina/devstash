# Current Feature

## Dashboard Collections — Live Data

Replace dummy collection data in the dashboard main area with real data from the Neon database via Prisma.

- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections in a server component (no mock data)
- Derive collection card border color from the most-used content type in that collection
- Show small icons of all types present in each collection
- Keep existing design (reference `context/screenshots/dashboard-ui-main.png`)
- Update collection stats display
- Do NOT add items underneath collections yet

## Status

Completed

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Started Dashboard UI Phase 1
- ShadCN initialized, Input/Button components added
- Created /dashboard route with dark mode, TopBar (search + New Item button), sidebar placeholder, main placeholder
- **Completed Dashboard UI Phase 1** — dark mode, TopBar with search + New Item button, sidebar and main placeholders
- **Completed Dashboard UI Phase 2** — collapsible sidebar with types/counts, favorite + all collections, user avatar area, mobile drawer
- **Completed Dashboard UI Phase 3** — stats cards, collections grid, pinned items, recent items in main area
- **Completed Prisma + Neon PostgreSQL Setup** — Prisma 7 with `prisma-client` provider, `prisma.config.ts` for DB URL, Neon adapter, full schema (User/NextAuth/Item/Collection/Tag/ItemType), initial migration applied, `scripts/test-db.ts` for connection testing
- **Completed Seed Data** — `prisma/seed.ts` with demo user (bcryptjs), 7 system item types, 5 collections, 18 items across snippets/prompts/commands/links; idempotent via upsert; `npm run db:seed` + updated `db:test`
- **Completed Dashboard Collections Live Data** — `src/lib/db/collections.ts` with `getCollections()`; dashboard page now async with real DB data; collection cards show dominant-type left border color and per-type icons at bottom; collection stats reflect real counts
