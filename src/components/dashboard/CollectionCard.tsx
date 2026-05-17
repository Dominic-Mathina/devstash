import {
  Star,
  MoreHorizontal,
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CollectionWithMeta } from "@/lib/db/collections";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  snippet: <Code className="h-3 w-3" />,
  prompt: <Sparkles className="h-3 w-3" />,
  command: <Terminal className="h-3 w-3" />,
  note: <StickyNote className="h-3 w-3" />,
  file: <File className="h-3 w-3" />,
  image: <ImageIcon className="h-3 w-3" />,
  link: <LinkIcon className="h-3 w-3" />,
};

export default function CollectionCard({ collection }: { collection: CollectionWithMeta }) {
  return (
    <div
      className="rounded-lg border bg-card p-4 flex flex-col gap-1.5 hover:border-border/80 transition-colors border-l-4"
      style={{ borderLeftColor: collection.dominantColor }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <h3 className="font-medium text-sm truncate">{collection.name}</h3>
          {collection.isFavorite && (
            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 -mr-1 -mt-0.5">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">{collection.itemCount} items</p>
      {collection.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">{collection.description}</p>
      )}

      {collection.types.length > 0 && (
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          {collection.types.map((type) => (
            <span
              key={type.name}
              style={{ color: type.color }}
              title={type.name}
            >
              {TYPE_ICONS[type.name]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
