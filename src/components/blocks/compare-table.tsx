import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CompareRow {
  feature: string;
  values: (string | boolean)[];
}

export interface CompareTableProps {
  /** Column headers, e.g. product names. */
  products: string[];
  rows: CompareRow[];
  /** Index of the highlighted/recommended column. */
  highlightIndex?: number;
  featureLabel?: string;
}

export function CompareTable({
  products,
  rows,
  highlightIndex,
  featureLabel = "",
}: CompareTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="px-5 py-4 text-left font-medium text-muted-foreground">
              {featureLabel}
            </th>
            {products.map((p, i) => (
              <th
                key={p}
                scope="col"
                className={cn(
                  "px-5 py-4 text-left font-display text-base font-semibold text-foreground",
                  i === highlightIndex && "bg-primary/5 text-primary"
                )}
              >
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-border last:border-0">
              <th scope="row" className="px-5 py-4 text-left font-normal text-muted-foreground">
                {row.feature}
              </th>
              {row.values.map((v, i) => (
                <td
                  key={i}
                  className={cn(
                    "px-5 py-4 text-foreground/90",
                    i === highlightIndex && "bg-primary/5"
                  )}
                >
                  {typeof v === "boolean" ? (
                    v ? (
                      <Check className="size-4 text-primary" aria-label="Yes" />
                    ) : (
                      <Minus className="size-4 text-muted-foreground/50" aria-label="No" />
                    )
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
