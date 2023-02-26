import clsx from "clsx";
import { ReactNode } from "react";

export default function CompendiumTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={clsx(
        "font-display-serif font-bold text-3xl md:text-4xl text-stone-900 dark:text-stone-200",
        className
      )}
    >
      {children}
    </h1>
  );
}
