import "dotenv/config"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "../src/generated/prisma/client"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

function section(title: string) {
  console.log(`\n── ${title} ${"─".repeat(40 - title.length)}`)
}

async function main() {
  // ── Connection ─────────────────────────────────────────────────────────────
  section("Connection")
  const [{ now }] = await prisma.$queryRaw<[{ now: Date }]>`SELECT NOW()`
  console.log("✓ Connected:", now.toISOString())

  // ── User ───────────────────────────────────────────────────────────────────
  section("User")
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    select: { id: true, name: true, email: true, isPro: true, emailVerified: true },
  })
  if (!user) throw new Error("Demo user not found — run npm run db:seed first")
  console.log(`✓ ${user.name} <${user.email}>`)
  console.log(`  isPro: ${user.isPro} | emailVerified: ${user.emailVerified?.toISOString()}`)

  // ── Item Types ─────────────────────────────────────────────────────────────
  section("Item Types")
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  })
  types.forEach((t) => console.log(`  ${t.icon?.padEnd(12)} ${t.name.padEnd(10)} ${t.color}`))
  console.log(`✓ ${types.length} system types`)

  // ── Collections ────────────────────────────────────────────────────────────
  section("Collections")
  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    include: { _count: { select: { items: true } } },
    orderBy: { name: "asc" },
  })
  collections.forEach((c) =>
    console.log(`  ${c.name.padEnd(22)} ${c._count.items} items  — ${c.description}`)
  )
  console.log(`✓ ${collections.length} collections`)

  // ── Items by Type ──────────────────────────────────────────────────────────
  section("Items by Type")
  const itemsByType = await prisma.item.groupBy({
    by: ["typeId"],
    where: { userId: user.id },
    _count: { id: true },
  })
  const typeMap = Object.fromEntries(types.map((t) => [t.id, t.name]))
  itemsByType.forEach((row) =>
    console.log(`  ${typeMap[row.typeId]?.padEnd(10)} ${row._count.id} items`)
  )
  const totalItems = itemsByType.reduce((sum, r) => sum + r._count.id, 0)
  console.log(`✓ ${totalItems} total items`)

  // ── Sample Items ───────────────────────────────────────────────────────────
  section("Sample Items (first 5)")
  const items = await prisma.item.findMany({
    where: { userId: user.id },
    include: { type: { select: { name: true } }, collection: { select: { name: true } } },
    take: 5,
    orderBy: { createdAt: "asc" },
  })
  items.forEach((item) =>
    console.log(`  [${item.type.name.padEnd(8)}] ${item.title.padEnd(30)} → ${item.collection?.name ?? "—"}`)
  )

  await prisma.$disconnect()
  section("Done")
  console.log("✓ All checks passed\n")
}

main().catch((err) => {
  console.error("\n✗ Test failed:", err.message ?? err)
  if (err.cause) console.error("  Cause:", err.cause)
  prisma.$disconnect()
  process.exit(1)
})
