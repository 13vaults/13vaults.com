import { BlogPost } from "@/.contentlayer/generated";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { PickPartial } from "@/utils";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
dayjs.extend(utc);
dayjs.extend(relativeTime);

type BlogPostItem = PickPartial<
  BlogPost,
  "excerpt" | "date" | "title" | "slug" | "published"
>;

type HomeNewsSectionItemP = BlogPostItem & {};

export default function HomeNewsSectionItem({
  slug,
  title,
  date,
  excerpt,
  published,
}: HomeNewsSectionItemP) {
  const { t } = useTranslation("home");
  return (
    <Link
      className={clsx(
        "block p-4 rounded-sm transition-all shadow-sm hover:shadow-md",
        {
          "bg-white dark:bg-stone-800 dark:text-white border border-stone-300 dark:border-stone-600 hover:border-teal-500":
            published,
          "bg-white text-black outline outline-2 outline-red-500": !published,
        }
      )}
      href={`/blog/${slug}`}
    >
      <section className="flex flex-col gap-2">
        <header className="font-display">
          {published ? null : (
            <div className="text-xl text-white font-black uppercase bg-red-500 p-1 mb-2">
              {t("unpublished-dev-label")}
            </div>
          )}
          <h1 className="text-2xl font-black">{title}</h1>
          <div className="text-sm font-medium">
            <time>
              {t("posted-ago", {
                timeAgo: dayjs(Date.parse(date)).utc().fromNow(false),
              })}
            </time>
          </div>
        </header>
        <div>
          <p className="my-2">{excerpt}</p>
          <p className="my-2 opacity-90 italic">{t("read-more")}</p>
        </div>
      </section>
    </Link>
  );
}
