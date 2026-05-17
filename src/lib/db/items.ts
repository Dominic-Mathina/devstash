import { prisma } from "@/lib/prisma";

export interface ItemType {
  id: string;
  name: string;
  color: string;
}

export interface ItemWithType {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  tags: string[];
  createdAt: Date;
  itemTypeId: string;
  type: ItemType;
}

export interface DashboardItems {
  pinned: ItemWithType[];
  recent: ItemWithType[];
  totalCount: number;
  favoriteCount: number;
}

function mapItem(item: {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  typeId: string;
  type: { id: string; name: string; color: string | null };
  tags: { tag: { name: string } }[];
}): ItemWithType {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    tags: item.tags.map((t) => t.tag.name),
    createdAt: item.createdAt,
    itemTypeId: item.typeId,
    type: {
      id: item.type.id,
      name: item.type.name,
      color: item.type.color ?? "#6b7280",
    },
  };
}

export async function getDashboardItems(): Promise<DashboardItems> {
  const demoUser = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    select: { id: true },
  });

  if (!demoUser) {
    return { pinned: [], recent: [], totalCount: 0, favoriteCount: 0 };
  }

  const includeShape = {
    type: true,
    tags: { include: { tag: true } },
  } as const;

  const [pinned, recent, totalCount, favoriteCount] = await Promise.all([
    prisma.item.findMany({
      where: { userId: demoUser.id, isPinned: true },
      include: includeShape,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.item.findMany({
      where: { userId: demoUser.id },
      include: includeShape,
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.item.count({ where: { userId: demoUser.id } }),
    prisma.item.count({ where: { userId: demoUser.id, isFavorite: true } }),
  ]);

  return {
    pinned: pinned.map(mapItem),
    recent: recent.map(mapItem),
    totalCount,
    favoriteCount,
  };
}
