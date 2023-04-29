import Link from "next/link";
import { ReactNode } from "react";
import Button from "./button";

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
      <div className="flex-1">
        <div>{description}</div>
        <div>{children}</div>
      </div>
      <Button
        as={Link}
        href={detailsHref}
        size="large"
        className="uppercase font-serif font-medium text-center"
      >
        {detailsLabel}
      </Button>
    </section>
  );
}
