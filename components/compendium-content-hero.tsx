import Link from "next/link";
import { ReactNode } from "react";

export default function CompendiumContentHero({
  title = null,
  detailsHref,
  detailsLabel,
  children,
  description,
}: {
  title: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  detailsHref: string;
  detailsLabel: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 p-4 bg-stone-50 dark:bg-stone-600 bg-gradient-to-tl from-amber-50/25 to-stone-50 dark:from-amber-900/25 dark:to-stone-700 shadow relative content-center justify-center rounded text-stone-900 dark:text-stone-50">
      <header>
        <h1 className="text-xl font-display-serif font-semibold">{title}</h1>
      </header>
      <div className="flex-1">{description}</div>
      <div className="text-sm">{children}</div>
      <Link
        className="p-2 bg-sky-500 dark:bg-sky-700 text-white block rounded shadow shadow-sky-600 dark:shadow-sky-800 transition-colors hover:bg-sky-400 dark:hover:bg-sky-600 text-shadow uppercase font-display font-medium text-center"
        href={detailsHref}
      >
        {detailsLabel}
      </Link>
    </section>
  );
}
