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
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarData } from "@/lib/db/items";
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
  sidebarData: SidebarData;
}

export default function Sidebar({ collapsed, onToggle, isMobile, sidebarData }: SidebarProps) {
  const { itemTypes, collections } = sidebarData;
  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = collections.filter((c) => !c.isFavorite);

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
            {itemTypes.map((type) => (
              <li key={type.id}>
                <Link
                  href={`/items/${type.name}`}
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
                        {type.count}
                      </span>
                    </>
                  )}
                </Link>
              </li>
            ))}
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

            {favoriteCollections.length > 0 && (
              <>
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
              </>
            )}

            {recentCollections.length > 0 && (
              <>
                <p className="px-4 mt-3 mb-0.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Recent
                </p>
                <ul className="space-y-0.5">
                  {recentCollections.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/collections/${c.id}`}
                        className="flex items-center gap-3 px-4 py-1.5 text-sm hover:bg-accent rounded-sm transition-colors"
                      >
                        <span className="flex-1 truncate">{c.name}</span>
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: c.dominantColor }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="px-4 mt-3">
              <Link
                href="/collections"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View all collections <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
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
          D
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Demo User</p>
              <p className="text-xs text-muted-foreground truncate">
                demo@devstash.io
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
