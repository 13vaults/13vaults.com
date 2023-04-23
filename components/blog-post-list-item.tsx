import React from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import socialBanner from "@/public/images/social-banner.webp";

interface BlogPostListItemP {
  label: string;
  title: React.ReactNode;
  to: string;
  published?: boolean;
  readMore?: string | null;
  excerpt: string;
  date: string;
}

function BlogPostListItem({
  label,
  title,
  to,
  date,
  published = true,
  readMore,
  excerpt,
}: BlogPostListItemP) {
  return (
    <div className="flex">
      <Link
        className={clsx(
          "p-4 block transition-all shadow-sm hover:shadow-md flex-1 group",
          {
            "bg-white dark:bg-stone-800 dark:text-white border border-stone-300 dark:border-stone-600 hover:border-teal-500":
              published,
            "bg-white text-black outline outline-2 outline-red-500": !published,
          }
        )}
        href={to}
      >
        <section aria-label={label} className="flex flex-col gap-2">
          <header className="font-display-serif">
            <h1 className="text-2xl font-black transition-colors group-hover:text-teal-600 group-hover:dark:text-teal-400 group-focus:text-teal-600 group-focus:dark:text-teal-400">
              {title}
            </h1>
            <div className="text-sm font-medium">
              <time className="font-display">{date}</time>
            </div>
          </header>
          <div>
            <p className="my-2">{excerpt}</p>
            <p className="my-2 opacity-90 italic">{readMore}</p>
          </div>
        </section>
      </Link>
    </div>
  );
}

function HeroVariant({
  title,
  to,
  published = true,
  date,
  excerpt,
  label,
  readMore,
}: BlogPostListItemP) {
  return (
    <div className="rounded-sm" role="listitem">
      <Link
        className={clsx(
          "transition-all bg-stone-800 text-white block relative group",
          {
            "bg-white text-black outline outline-2 outline-red-500": !published,
          }
        )}
        href={to}
      >
        <Image
          className="object-top object-cover h-full w-full relative"
          src={socialBanner}
          placeholder="blur"
          fill
          role="presentation"
          unoptimized={process.env.NODE_ENV === "development"}
          alt=""
        />
        <section
          aria-label={label}
          className="flex flex-col gap-2 p-4 min-h-[24rem] relative justify-end bg-gradient-to-t bg-black/10 from-black/70 to-black/0 group-focus:bg-black/50 group-hover:bg-black/50 transition-all ring-inset ring ring-teal-500/50 group-focus:ring-teal-500 group-hover:ring-teal-500"
        >
          <header className="font-display-serif">
            <h1 className="text-2xl md:text-4xl font-black transition-colors group-focus:text-teal-400 group-hover:text-teal-400">
              {title}
            </h1>
            <div className="text-sm font-medium">
              <time className="font-display">{date}</time>
            </div>
          </header>
          <div>
            <p className="my-2">{excerpt}</p>
            <p className="my-2 opacity-90 italic">{readMore}</p>
          </div>
        </section>
      </Link>
    </div>
  );
}

BlogPostListItem.Hero = HeroVariant;

export default BlogPostListItem;
