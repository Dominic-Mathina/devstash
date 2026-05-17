import "dotenv/config"
import bcrypt from "bcryptjs"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "../src/generated/prisma/client"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  // ── User ──────────────────────────────────────────────────────────────────
  const password = await bcrypt.hash("12345678", 12)

  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      email: "demo@devstash.io",
      name: "Demo User",
      password,
      isPro: false,
      emailVerified: new Date(),
    },
  })

  // ── System Item Types ─────────────────────────────────────────────────────
  const typeData = [
    { name: "snippet", icon: "Code",       color: "#3b82f6" },
    { name: "prompt",  icon: "Sparkles",   color: "#8b5cf6" },
    { name: "command", icon: "Terminal",   color: "#f97316" },
    { name: "note",    icon: "StickyNote", color: "#fde047" },
    { name: "file",    icon: "File",       color: "#6b7280" },
    { name: "image",   icon: "Image",      color: "#ec4899" },
    { name: "link",    icon: "Link",       color: "#10b981" },
  ]

  const types: Record<string, string> = {}

  for (const t of typeData) {
    const itemType = await prisma.itemType.upsert({
      where: { id: `system-${t.name}` },
      update: {},
      create: {
        id: `system-${t.name}`,
        name: t.name,
        icon: t.icon,
        color: t.color,
        isSystem: true,
        userId: null,
      },
    })
    types[t.name] = itemType.id
  }

  // ── Collections & Items ───────────────────────────────────────────────────

  // React Patterns
  const reactPatterns = await prisma.collection.upsert({
    where: { id: "seed-collection-react-patterns" },
    update: {},
    create: {
      id: "seed-collection-react-patterns",
      name: "React Patterns",
      description: "Reusable React patterns and hooks",
      userId: user.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-react-1" },
    update: {},
    create: {
      id: "seed-item-react-1",
      title: "Custom Hooks",
      contentType: "text",
      language: "typescript",
      content: `function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initial
    } catch {
      return initial
    }
  })
  const set = (v: T) => {
    setValue(v)
    localStorage.setItem(key, JSON.stringify(v))
  }
  return [value, set] as const
}`,
      userId: user.id,
      typeId: types.snippet,
      collectionId: reactPatterns.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-react-2" },
    update: {},
    create: {
      id: "seed-item-react-2",
      title: "Component Patterns",
      contentType: "text",
      language: "typescript",
      content: `// Context provider pattern
const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

// Compound component pattern
function Tabs({ children }: { children: ReactNode }) { return <div>{children}</div> }
Tabs.List = function TabList({ children }: { children: ReactNode }) { return <div role="tablist">{children}</div> }
Tabs.Panel = function TabPanel({ children }: { children: ReactNode }) { return <div role="tabpanel">{children}</div> }`,
      userId: user.id,
      typeId: types.snippet,
      collectionId: reactPatterns.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-react-3" },
    update: {},
    create: {
      id: "seed-item-react-3",
      title: "Utility Functions",
      contentType: "text",
      language: "typescript",
      content: `export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = String(item[key])
    return { ...acc, [group]: [...(acc[group] ?? []), item] }
  }, {} as Record<string, T[]>)
}

export function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}`,
      userId: user.id,
      typeId: types.snippet,
      collectionId: reactPatterns.id,
    },
  })

  // AI Workflows
  const aiWorkflows = await prisma.collection.upsert({
    where: { id: "seed-collection-ai-workflows" },
    update: {},
    create: {
      id: "seed-collection-ai-workflows",
      name: "AI Workflows",
      description: "AI prompts and workflow automations",
      userId: user.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-ai-1" },
    update: {},
    create: {
      id: "seed-item-ai-1",
      title: "Code Review Prompt",
      contentType: "text",
      content: `Review the following code for:
1. Security vulnerabilities (injection, XSS, auth issues)
2. Performance bottlenecks (N+1 queries, unnecessary re-renders)
3. Logic errors and edge cases
4. Adherence to SOLID principles
5. Naming clarity and readability

For each issue found, provide:
- Severity: Critical / Major / Minor
- Location: file and line
- Explanation of the problem
- Suggested fix with code example

Code to review:
\`\`\`
{{code}}
\`\`\``,
      userId: user.id,
      typeId: types.prompt,
      collectionId: aiWorkflows.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-ai-2" },
    update: {},
    create: {
      id: "seed-item-ai-2",
      title: "Documentation Generator",
      contentType: "text",
      content: `Generate comprehensive documentation for the following function/module.

Include:
- Purpose: one-sentence summary
- Parameters: name, type, description, required/optional
- Return value: type and description
- Throws: any exceptions and when
- Example usage: at least one realistic example

Format as JSDoc/TSDoc comments ready to paste above the function.

Function:
\`\`\`
{{code}}
\`\`\``,
      userId: user.id,
      typeId: types.prompt,
      collectionId: aiWorkflows.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-ai-3" },
    update: {},
    create: {
      id: "seed-item-ai-3",
      title: "Refactoring Assistant",
      contentType: "text",
      content: `Refactor the following code to improve quality without changing behavior.

Goals:
- Reduce duplication (DRY)
- Improve readability and naming
- Simplify complex conditionals
- Extract reusable helpers where it makes sense
- Keep functions under 30 lines

Constraints:
- Do NOT change the public API or function signatures
- Do NOT add new dependencies
- Preserve all existing tests

Code:
\`\`\`
{{code}}
\`\`\``,
      userId: user.id,
      typeId: types.prompt,
      collectionId: aiWorkflows.id,
    },
  })

  // DevOps
  const devops = await prisma.collection.upsert({
    where: { id: "seed-collection-devops" },
    update: {},
    create: {
      id: "seed-collection-devops",
      name: "DevOps",
      description: "Infrastructure and deployment resources",
      userId: user.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-devops-1" },
    update: {},
    create: {
      id: "seed-item-devops-1",
      title: "Next.js Dockerfile",
      contentType: "text",
      language: "dockerfile",
      content: `FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`,
      userId: user.id,
      typeId: types.snippet,
      collectionId: devops.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-devops-2" },
    update: {},
    create: {
      id: "seed-item-devops-2",
      title: "Deploy to Vercel",
      contentType: "text",
      language: "bash",
      content: `# Install Vercel CLI and deploy
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production`,
      userId: user.id,
      typeId: types.command,
      collectionId: devops.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-devops-3" },
    update: {},
    create: {
      id: "seed-item-devops-3",
      title: "Neon PostgreSQL Docs",
      contentType: "text",
      url: "https://neon.tech/docs/introduction",
      description: "Official Neon serverless Postgres documentation",
      userId: user.id,
      typeId: types.link,
      collectionId: devops.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-devops-4" },
    update: {},
    create: {
      id: "seed-item-devops-4",
      title: "Prisma ORM Docs",
      contentType: "text",
      url: "https://www.prisma.io/docs",
      description: "Prisma ORM documentation including migrations, schema reference, and client API",
      userId: user.id,
      typeId: types.link,
      collectionId: devops.id,
    },
  })

  // Terminal Commands
  const terminal = await prisma.collection.upsert({
    where: { id: "seed-collection-terminal" },
    update: {},
    create: {
      id: "seed-collection-terminal",
      name: "Terminal Commands",
      description: "Useful shell commands for everyday development",
      userId: user.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-terminal-1" },
    update: {},
    create: {
      id: "seed-item-terminal-1",
      title: "Git Operations",
      contentType: "text",
      language: "bash",
      content: `# Undo last commit but keep changes staged
git reset --soft HEAD~1

# Stash with a name
git stash push -m "wip: feature description"

# Show all stashes and pop specific one
git stash list
git stash pop stash@{2}

# Delete merged branches
git branch --merged | grep -v '\\*\\|main\\|master' | xargs git branch -d

# Interactive rebase for last N commits
git rebase -i HEAD~3

# Search commits by message
git log --all --grep="fix:"`,
      userId: user.id,
      typeId: types.command,
      collectionId: terminal.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-terminal-2" },
    update: {},
    create: {
      id: "seed-item-terminal-2",
      title: "Docker Commands",
      contentType: "text",
      language: "bash",
      content: `# Build and tag image
docker build -t myapp:latest .

# Run with env file and port mapping
docker run --env-file .env -p 3000:3000 myapp:latest

# Stop and remove all containers
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)

# Remove unused images, containers, networks, volumes
docker system prune -af --volumes

# Inspect container logs (follow)
docker logs -f <container_id>

# Shell into running container
docker exec -it <container_id> sh`,
      userId: user.id,
      typeId: types.command,
      collectionId: terminal.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-terminal-3" },
    update: {},
    create: {
      id: "seed-item-terminal-3",
      title: "Process Management",
      contentType: "text",
      language: "bash",
      content: `# Find process using a port
lsof -i :3000
# or on Windows:
netstat -ano | findstr :3000

# Kill process on port
kill -9 $(lsof -t -i:3000)

# Show top processes by memory
ps aux --sort=-%mem | head -10

# Run process in background, immune to hangups
nohup npm run start &

# Watch a command every 2 seconds
watch -n 2 'docker stats --no-stream'`,
      userId: user.id,
      typeId: types.command,
      collectionId: terminal.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-terminal-4" },
    update: {},
    create: {
      id: "seed-item-terminal-4",
      title: "Package Manager Utilities",
      contentType: "text",
      language: "bash",
      content: `# Check outdated packages
npm outdated

# Update all packages to latest (respects semver)
npm update

# Find why a package is installed
npm why <package>

# Remove extraneous packages
npm prune

# Audit and auto-fix vulnerabilities
npm audit fix

# List globally installed packages
npm list -g --depth=0

# Clear npm cache
npm cache clean --force`,
      userId: user.id,
      typeId: types.command,
      collectionId: terminal.id,
    },
  })

  // Design Resources
  const design = await prisma.collection.upsert({
    where: { id: "seed-collection-design" },
    update: {},
    create: {
      id: "seed-collection-design",
      name: "Design Resources",
      description: "UI/UX resources and references",
      userId: user.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-design-1" },
    update: {},
    create: {
      id: "seed-item-design-1",
      title: "Tailwind CSS Docs",
      contentType: "text",
      url: "https://tailwindcss.com/docs",
      description: "Full Tailwind CSS utility class reference and configuration guide",
      userId: user.id,
      typeId: types.link,
      collectionId: design.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-design-2" },
    update: {},
    create: {
      id: "seed-item-design-2",
      title: "shadcn/ui Components",
      contentType: "text",
      url: "https://ui.shadcn.com/docs/components",
      description: "Accessible, unstyled component library built on Radix UI and Tailwind",
      userId: user.id,
      typeId: types.link,
      collectionId: design.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-design-3" },
    update: {},
    create: {
      id: "seed-item-design-3",
      title: "Radix UI Primitives",
      contentType: "text",
      url: "https://www.radix-ui.com/primitives",
      description: "Low-level, accessible UI primitives for building design systems",
      userId: user.id,
      typeId: types.link,
      collectionId: design.id,
    },
  })

  await prisma.item.upsert({
    where: { id: "seed-item-design-4" },
    update: {},
    create: {
      id: "seed-item-design-4",
      title: "Lucide Icons",
      contentType: "text",
      url: "https://lucide.dev/icons",
      description: "Open-source icon library with 1000+ clean, consistent SVG icons",
      userId: user.id,
      typeId: types.link,
      collectionId: design.id,
    },
  })

  console.log("✓ Seeded user:", user.email)
  console.log("✓ Seeded item types:", typeData.map((t) => t.name).join(", "))
  console.log("✓ Seeded collections: React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources")
}

main()
  .catch((err) => {
    console.error("Seed failed:", err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
