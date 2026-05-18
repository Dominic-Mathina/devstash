# Current Feature

## Status

<!-- Not Started | In Progress | Completed -->

## Goals

<!-- Bullet points of what success looks like -->

## Notes

<!-- Additional context, constraints, or details -->

## Previous Feature

### Dashboard Items — Live Data

Replace dummy item data in the dashboard main area (pinned and recent items) with real data from the Neon database via Prisma.

- Create `src/lib/db/items.ts` with data fetching functions
- Fetch items directly in server component (no mock data)
- Item card icon/border derived from the item type
- Display item type tags and all existing card content
- If there are no pinned items, hide the pinned section entirely
- Keep existing design (reference `context/screenshots/dashboard-ui-main.png`)
- Update collection stats display

**Status: Completed**

## Previous Feature

### Dashboard Collections — Live Data

Replace dummy collection data in the dashboard main area with real data from the Neon database via Prisma.

- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections in a server component (no mock data)
- Derive collection card border color from the most-used content type in that collection
- Show small icons of all types present in each collection
- Keep existing design (reference `context/screenshots/dashboard-ui-main.png`)
- Update collection stats display
- Do NOT add items underneath collections yet

**Status: Completed**

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
- **Completed Dashboard Items Live Data** — `src/lib/db/items.ts` with `getDashboardItems()`; pinned and recent items fetched from DB; tags flattened from relations; item card icon/border from real item type; pinned section hidden when empty; stats (total, favorites) from live counts
- **Completed Stats & Sidebar Live Data** — `getSidebarData()` added to `src/lib/db/items.ts`; sidebar item types with live counts link to `/items/[typename]`; favorite collections show star, recent collections show dominant-type color dot; "View all collections" link added; mock data fully removed from sidebar
- **Completed Add Pro Badge to Sidebar** — ShadCN `Badge` component added; file and image item types in the sidebar now display a subtle outline PRO badge instead of their item count
