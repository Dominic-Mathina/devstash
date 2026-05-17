"use client";

import { useState } from "react";
import { Menu, Search, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { SidebarData } from "@/lib/db/items";

interface DashboardShellProps {
  children: React.ReactNode;
  sidebarData: SidebarData;
}

export default function DashboardShell({ children, sidebarData }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-4 border-b px-6 py-3 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-8 w-8"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 mr-4">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <LayoutGrid className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">DevStash</span>
        </div>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search items..." className="pl-9 pr-16" />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">New Collection</Button>
          <Button>+ New Item</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden md:flex shrink-0">
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((c) => !c)}
            sidebarData={sidebarData}
          />
        </div>

        {/* Mobile drawer */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileOpen(false)}
              isMobile
              sidebarData={sidebarData}
            />
          </SheetContent>
        </Sheet>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
