import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  container = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  container?: boolean;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      {container ? <div className="container">{children}</div> : children}
    </section>
  );
}
