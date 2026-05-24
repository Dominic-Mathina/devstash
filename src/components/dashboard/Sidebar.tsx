"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PanelLeft, Star, X, ChevronDown, ArrowRight, LogOut } from "lucide-react";
import { useMemo } from "react";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";
import { cn } from "@/lib/utils";
import { SidebarData } from "@/lib/db/items";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTypeIcon } from "@/lib/item-type-icons";
import UserAvatar from "@/components/UserAvatar";

const PRO_TYPES = new Set(["file", "image"]);

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  sidebarData: SidebarData;
  user: (User & { id: string }) | null;
}

export default function Sidebar({ collapsed, onToggle, isMobile, sidebarData, user }: SidebarProps) {
  const router = useRouter();
  const { itemTypes, collections } = sidebarData;
  const favoriteCollections = useMemo(() => collections.filter((c) => c.isFavorite), [collections]);
  const recentCollections = useMemo(() => collections.filter((c) => !c.isFavorite), [collections]);

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
                    {getTypeIcon(type.name)}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 capitalize">{type.name}s</span>
                      {PRO_TYPES.has(type.name) ? (
                        <Badge variant="outline" className="h-4 px-1 text-[10px] font-semibold text-muted-foreground border-muted-foreground/30">
                          PRO
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {type.count}
                        </span>
                      )}
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
      <div className="border-t p-3 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex items-center gap-3 w-full rounded-md hover:bg-accent transition-colors p-1 text-left",
              collapsed && "justify-center"
            )}
          >
            <UserAvatar name={user?.name} image={user?.image} />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name ?? "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</p>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align={collapsed ? "center" : "end"} className="w-48">
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
