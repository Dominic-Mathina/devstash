import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

const ICON_FACTORIES: Record<string, (cls: string) => React.ReactNode> = {
  snippet: (cls) => <Code className={cls} />,
  prompt: (cls) => <Sparkles className={cls} />,
  command: (cls) => <Terminal className={cls} />,
  note: (cls) => <StickyNote className={cls} />,
  file: (cls) => <File className={cls} />,
  image: (cls) => <ImageIcon className={cls} />,
  link: (cls) => <LinkIcon className={cls} />,
};

export function getTypeIcon(name: string, className = "h-4 w-4"): React.ReactNode {
  const factory = ICON_FACTORIES[name];
  return factory ? factory(className) : <File className={className} />;
}
