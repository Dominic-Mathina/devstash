import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  return (
    <header className="flex items-center gap-4 border-b px-6 py-3 shrink-0">
      <span className="text-lg font-semibold tracking-tight mr-4">DevStash</span>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search items..."
          className="pl-9"
        />
      </div>
      <div className="ml-auto">
        <Button>+ New Item</Button>
      </div>
    </header>
  );
}
