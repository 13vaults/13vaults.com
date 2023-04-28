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
    <section className="flex flex-col gap-4 p-4 bg-stone-50 dark:bg-stone-900 bg-gradient-to-tl dark:bg-gradient-to-br from-teal-50/25 to-stone-50 dark:from-teal-900/25 dark:to-transparent shadow relative content-center justify-center rounded text-stone-900 dark:text-stone-50">
      <header>
        <h1 className="text-xl font-display-serif font-semibold">{title}</h1>
      </header>
      <div className="flex-1">{description}</div>
      <div>{children}</div>
      <Link
        className="p-2 bg-teal-500 dark:bg-teal-700 text-white block rounded shadow shadow-teal-600 dark:shadow-teal-800 transition-colors hover:bg-teal-400 dark:hover:bg-teal-600 text-shadow uppercase font-serif font-medium text-center"
        href={detailsHref}
      >
        {detailsLabel}
      </Link>
    </section>
  );
}
