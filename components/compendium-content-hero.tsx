import Link from "next/link";
import { ReactNode } from "react";
import Button from "./button";
import Label from "./label";

interface CompendiumContentHeroP {
  title: string;
  children: ReactNode;
  description?: ReactNode;
  detailsHref: string;
  detailsLabel: ReactNode;
}

export default function CompendiumContentHero({
  title,
  detailsHref,
  detailsLabel,
  children,
  description,
}: CompendiumContentHeroP) {
  return (
    <section className="flex flex-col gap-4 p-4 bg-stone-50 dark:bg-stone-900 content-center justify-center text-stone-900 dark:text-stone-50 border border-stone-200 dark:border-stone-800">
      <Label variant="title" as="h1">
        {title}
      </Label>
      <div className="flex-1">
        <div>{description}</div>
        <div>{children}</div>
      </div>
      <Button as={Link} href={detailsHref} className="text-center">
        <Label variant="label" as="span">
          {detailsLabel}
        </Label>
      </Button>
    </section>
  );
}
