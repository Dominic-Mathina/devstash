import { prisma } from "@/lib/prisma";

export interface CollectionType {
  name: string;
  color: string;
}

export interface CollectionWithMeta {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  updatedAt: Date;
  dominantColor: string;
  types: CollectionType[];
}

export async function getCollections(): Promise<CollectionWithMeta[]> {
  const demoUser = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    select: { id: true },
  });

  if (!demoUser) return [];

  const collections = await prisma.collection.findMany({
    where: { userId: demoUser.id },
    include: {
      items: {
        include: { type: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return collections.map((c) => {
    const typeCounts = new Map<string, { count: number; name: string; color: string }>();

    for (const item of c.items) {
      const { id, name, color } = item.type;
      const existing = typeCounts.get(id);
      if (existing) {
        existing.count++;
      } else {
        typeCounts.set(id, { count: 1, name, color: color ?? "#6b7280" });
      }
    }

    const sortedTypes = [...typeCounts.values()].sort((a, b) => b.count - a.count);

    return {
      id: c.id,
      name: c.name,
      description: c.description,
      isFavorite: c.isFavorite,
      itemCount: c.items.length,
      updatedAt: c.updatedAt,
      dominantColor: sortedTypes[0]?.color ?? "#6b7280",
      types: sortedTypes.map(({ name, color }) => ({ name, color })),
    };
  });
}
