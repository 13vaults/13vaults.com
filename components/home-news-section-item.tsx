import { BlogPost } from "@/.contentlayer/generated";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { PickPartial } from "@/utils";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import Image from "next/image";
import socialBanner from "@/public/images/social-banner.webp";

dayjs.extend(utc);
dayjs.extend(relativeTime);

type BlogPostItem = PickPartial<
  BlogPost,
  "excerpt" | "date" | "title" | "slug" | "published"
>;

type HomeNewsSectionItemP = BlogPostItem & {};

function HomeNewsSectionItem({
  slug,
  title,
  date,
  excerpt,
  published,
}: HomeNewsSectionItemP) {
  const { t } = useTranslation("home");

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
        href={`/blog/${slug}`}
      >
        <section aria-label={title} className="flex flex-col gap-2">
          <header className="font-display">
            {published ? null : (
              <div className="text-xl text-white font-black uppercase bg-red-500 p-1 mb-2">
                {t("unpublished-dev-label")}
              </div>
            )}
            <h1 className="text-2xl font-black transition-colors group-hover:text-teal-600 group-hover:dark:text-teal-400 group-focus:text-teal-600 group-focus:dark:text-teal-400">
              {title}
            </h1>
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
    </div>
  );
}

function HeroVariant({
  slug,
  title,
  date,
  excerpt,
  published,
}: HomeNewsSectionItemP) {
  const { t } = useTranslation("home");
  return (
    <div className="rounded-sm" role="listitem">
      <Link
        className={clsx(
          "transition-all shadow-sm hover:shadow-md bg-stone-800 text-white block relative focus:ring focus:outline-none focus:ring-teal-500 group",
          {
            "bg-white text-black outline outline-2 outline-red-500": !published,
          }
        )}
        href={`/blog/${slug}`}
      >
        <Image
          className="object-top object-cover h-full w-full relative"
          src={socialBanner}
          placeholder="blur"
          fill
          role="presentation"
          alt=""
        />
        <section
          aria-label={title}
          className="flex flex-col gap-2 p-4 min-h-[24rem] relative justify-end bg-gradient-to-t bg-black/10 from-black/70 to-black/0 group-hover:bg-black/50 transition-all"
        >
          <header className="font-display">
            {published ? null : (
              <div className="text-xl text-white font-black uppercase bg-red-500 p-1 mb-2">
                {t("unpublished-dev-label")}
              </div>
            )}
            <h1 className="text-2xl md:text-4xl font-black transition-colors group-focus:text-teal-400 group-hover:text-teal-400">
              {title}
            </h1>
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
    </div>
  );
}

HomeNewsSectionItem.Hero = HeroVariant;

export default HomeNewsSectionItem;
