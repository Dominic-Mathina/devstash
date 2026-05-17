import {
  Star,
  Pin,
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

const TYPE_ICONS: Record<string, React.ReactNode> = {
  snippet: <Code className="h-4 w-4" />,
  prompt: <Sparkles className="h-4 w-4" />,
  command: <Terminal className="h-4 w-4" />,
  note: <StickyNote className="h-4 w-4" />,
  file: <File className="h-4 w-4" />,
  image: <ImageIcon className="h-4 w-4" />,
  link: <LinkIcon className="h-4 w-4" />,
};

interface ItemType {
  id: string;
  name: string;
  color: string;
}

interface Item {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  tags: string[];
  createdAt: Date;
  itemTypeId: string;
}

interface ItemCardProps {
  item: Item;
  itemType: ItemType | undefined;
}

export default function ItemCard({ item, itemType }: ItemCardProps) {
  const date = item.createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-lg border bg-card p-4 flex gap-3 hover:border-border/80 transition-colors">
      {/* Type icon block */}
      {itemType && (
        <div
          className="h-9 w-9 rounded-md flex items-center justify-center shrink-0 text-white mt-0.5"
          style={{ backgroundColor: itemType.color + "33", color: itemType.color }}
        >
          {TYPE_ICONS[itemType.name]}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="font-medium text-sm truncate">{item.title}</h3>
            {item.isFavorite && (
              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
            )}
            {item.isPinned && (
              <Pin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs text-muted-foreground">{date}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {item.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
