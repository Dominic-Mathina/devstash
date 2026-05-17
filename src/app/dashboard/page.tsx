export const dynamic = "force-dynamic";

import {
  LayoutGrid,
  FolderOpen,
  Star,
  Pin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { getCollections } from "@/lib/db/collections";
import { getDashboardItems } from "@/lib/db/items";
import CollectionCard from "@/components/dashboard/CollectionCard";
import ItemCard from "@/components/dashboard/ItemCard";

export default async function DashboardPage() {
  const [collections, { pinned, recent, totalCount, favoriteCount }] =
    await Promise.all([getCollections(), getDashboardItems()]);

  const stats = [
    { label: "Total Items", value: totalCount, icon: LayoutGrid },
    { label: "Collections", value: collections.length, icon: FolderOpen },
    { label: "Favorite Items", value: favoriteCount, icon: Star },
    { label: "Favorite Collections", value: collections.filter((c) => c.isFavorite).length, icon: Pin },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your developer knowledge hub
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg border bg-card p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center shrink-0">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold leading-none">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Collections */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Collections</h2>
          <Link
            href="/collections"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {collections.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </section>

      {/* Pinned */}
      {pinned.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Pin className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">Pinned</h2>
          </div>
          <div className="flex flex-col gap-3">
            {pinned.map((item) => (
              <ItemCard key={item.id} item={item} itemType={item.type} />
            ))}
          </div>
        </section>
      )}

      {/* Recent items */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Recent Items</h2>
          <Link
            href="/items"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {recent.map((item) => (
            <ItemCard key={item.id} item={item} itemType={item.type} />
          ))}
        </div>
      </section>
    </div>
  );
}
