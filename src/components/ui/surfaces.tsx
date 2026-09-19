import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="card" className={cn("ui-card", className)} {...props} />
  );
}
export function Badge({
  className,
  accent = false,
  ...props
}: ComponentProps<"span"> & { accent?: boolean }) {
  return (
    <span
      data-slot="badge"
      className={cn("ui-badge", accent && "ui-badge-accent", className)}
      {...props}
    />
  );
}
export function Separator({ className, ...props }: ComponentProps<"hr">) {
  return <hr className={cn("ui-separator border-0", className)} {...props} />;
}
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}
