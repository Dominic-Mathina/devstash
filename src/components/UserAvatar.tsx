import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function UserAvatar({ name, image, className }: UserAvatarProps) {
  const initials = name ? getInitials(name) : "?";

  return (
    <div
      className={cn(
        "h-8 w-8 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0 text-sm font-medium select-none",
        className
      )}
    >
      {image ? (
        <Image src={image} alt={name ?? "User"} width={32} height={32} className="object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
