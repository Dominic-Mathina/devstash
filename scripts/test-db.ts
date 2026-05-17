import "dotenv/config"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "../src/generated/prisma/client"

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
  const prisma = new PrismaClient({ adapter })

  console.log("Testing database connection...")

  const result = await prisma.$queryRaw<[{ now: Date }]>`SELECT NOW()`
  console.log("✓ Connected to database:", result[0].now)

  const tableCount = await prisma.$queryRaw<[{ count: bigint }]>`
    SELECT COUNT(*) as count
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `
  console.log(`✓ Tables in schema: ${tableCount[0].count}`)

  const tables = await prisma.$queryRaw<{ table_name: string }[]>`
    SELECT table_name::text
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `
  console.log("✓ Tables:", tables.map((t) => t.table_name).join(", "))

  await prisma.$disconnect()
  console.log("✓ Disconnected cleanly")
}

main().catch((err) => {
  console.error("✗ Database test failed:", err.message ?? err)
  if (err.cause) console.error("  Cause:", err.cause)
  process.exit(1)
})
