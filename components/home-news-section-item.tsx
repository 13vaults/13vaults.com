import { BlogPost } from "@/.contentlayer/generated";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { PickPartial } from "@/utils";
import Link from "next/link";
import { useTranslation } from "next-i18next";
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
}: HomeNewsSectionItemP) {
  const { t } = useTranslation("home");
  return (
    <Link className="block" href={`/blog/${slug}`}>
      <div>{title}</div>
      <div>
        {t("posted-ago", {
          timeAgo: dayjs(Date.parse(date)).utc().fromNow(false),
        })}
      </div>
    </Link>
  );
}
