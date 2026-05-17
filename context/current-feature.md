# Current Feature

<!-- Next feature goes here -->

## Status

<!-- -->

## Goals

- Install and configure Prisma 7 (follow upgrade guide for breaking changes)
- Connect to Neon PostgreSQL (serverless) via DATABASE_URL
- Create initial schema from data models in @context/project-overview.md
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Always use migrations — never db push

## Notes

Use Prisma 7 (has breaking changes vs v6). Read the full upgrade guide before implementing.
Development DB in DATABASE_URL, production DB separate. Always `prisma migrate dev`, never `prisma db push`.

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
