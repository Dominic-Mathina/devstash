"use client";

import Link from "next/link";
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  ImageIcon,
  Link as LinkIcon,
  PanelLeft,
  Star,
  Settings,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockItemTypes,
  mockItemTypeCounts,
  mockCollections,
  mockUser,
} from "@/lib/mock-data";
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

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

export default function Sidebar({ collapsed, onToggle, isMobile }: SidebarProps) {
  const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
  const recentCollections = mockCollections
    .filter((c) => !c.isFavorite)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-background transition-all duration-200",
        collapsed ? "w-14" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex items-center p-3 border-b shrink-0",
          collapsed ? "justify-center" : "justify-end"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {isMobile ? (
            <X className="h-4 w-4" />
          ) : (
            <PanelLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 space-y-5">
        {/* Types */}
        <div>
          {!collapsed && (
            <div className="flex items-center justify-between px-4 mb-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Types
              </p>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
          )}
          <ul className="space-y-0.5">
            {mockItemTypes.map((type) => {
              const count =
                mockItemTypeCounts[
                  type.name as keyof typeof mockItemTypeCounts
                ];
              return (
                <li key={type.id}>
                  <Link
                    href={`/items/${type.name}s`}
                    className={cn(
                      "flex items-center gap-3 py-1.5 text-sm hover:bg-accent rounded-sm transition-colors",
                      collapsed ? "justify-center px-2" : "px-4"
                    )}
                  >
                    <span style={{ color: type.color }}>
                      {TYPE_ICONS[type.name]}
                    </span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 capitalize">{type.name}s</span>
                        <span className="text-xs text-muted-foreground">
                          {count}
                        </span>
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Collections */}
        {!collapsed && (
          <div>
            <div className="flex items-center justify-between px-4 mb-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Collections
              </p>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>

            <p className="px-4 mt-3 mb-0.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Favorites
            </p>
            <ul className="space-y-0.5">
              {favoriteCollections.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/collections/${c.id}`}
                    className="flex items-center gap-3 px-4 py-1.5 text-sm hover:bg-accent rounded-sm transition-colors"
                  >
                    <span className="flex-1 truncate">{c.name}</span>
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="px-4 mt-3 mb-0.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              All Collections
            </p>
            <ul className="space-y-0.5">
              {recentCollections.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/collections/${c.id}`}
                    className="flex items-center gap-3 px-4 py-1.5 text-sm hover:bg-accent rounded-sm transition-colors"
                  >
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {c.itemCount}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* User area */}
      <div
        className={cn(
          "border-t p-3 flex items-center gap-3 shrink-0",
          collapsed && "justify-center"
        )}
      >
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm font-medium">
          {mockUser.name.charAt(0)}
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {mockUser.email}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
              <Settings className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
