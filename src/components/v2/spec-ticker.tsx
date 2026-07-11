"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function SpecTicker({ items }: { items: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 2600);
    return () => clearInterval(id);
  }, [items.length, reduce]);

  return (
    <div className="font-mono-v2 flex items-center gap-3 text-sm text-foreground/80">
      <span className="h-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={items[i]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="block whitespace-nowrap"
          >
            {items[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-hidden className="text-primary">←</span>
    </div>
  );
}
