"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <div className={cn("flex ", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group w-max block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-yellow-200 bg-opacity-20 dark:bg-slate-800/[0.8] block rounded-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.1, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className={`${pathname === item?.link && "bg-yellow-500"}`}>
            <CardTitle className={`${pathname === item?.link && "text-black"}`}>
              {item.title}
            </CardTitle>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-sm h-full  overflow-hidden border-2 border-yellow-500 dark:border-white/[0.2]  relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold text-center", className)}>
      {children}
    </h4>
  );
};
