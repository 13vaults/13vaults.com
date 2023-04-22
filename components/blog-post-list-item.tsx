import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface BlogPostListItemP {
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
  to: string;
  published?: boolean;
  subtitle: React.ReactNode;
}

function BlogPostListItem({
  label,
  title,
  to,
  subtitle,
  published = true,
  children,
}: BlogPostListItemP) {
  return (
    <div role="listitem" className="flex">
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
            <div className="text-sm font-medium">{subtitle}</div>
          </header>
          <div>{children}</div>
        </section>
      </Link>
    </div>
  );
}

export default BlogPostListItem;
