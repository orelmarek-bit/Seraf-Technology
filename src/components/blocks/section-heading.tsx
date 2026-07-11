import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  kickerIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h1";
}

export function SectionHeading({
  kicker,
  kickerIcon: Icon,
  title,
  subtitle,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {kicker && (
        <Badge variant="primary" className="w-fit">
          {Icon && <Icon className="size-3.5" />}
          {kicker}
        </Badge>
      )}
      <Tag className={cn(Tag === "h1" ? "text-display" : "text-h1", "font-semibold text-gradient")}>
        {title}
      </Tag>
      {subtitle && (
        <p className={cn("text-lg text-muted-foreground", align === "center" ? "max-w-2xl" : "max-w-xl")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
