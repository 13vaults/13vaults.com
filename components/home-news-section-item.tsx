import { BlogPost } from "@/.contentlayer/generated";
import dayjs from "dayjs";
import { PickPartial } from "@/utils";
import { useTranslation } from "next-i18next";
import BlogPostListItem from "./blog-post-list-item";

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
  const { t } = useTranslation();

  return (
    <BlogPostListItem
      to={`/blog/${slug}`}
      published={published}
      date={t("news.post.published-on", {
        date: dayjs.tz(date).format("YYYY-MM-DD"),
      })}
      label={title}
      title={title}
      excerpt={excerpt}
      readMore={t("news.post.read-more")}
    />
  );
}

function HeroVariant({
  slug,
  title,
  date,
  excerpt,
  published,
}: HomeNewsSectionItemP) {
  const { t } = useTranslation();

  return (
    <BlogPostListItem.Hero
      to={`/blog/${slug}`}
      published={published}
      date={t("news.post.published-on", {
        date: dayjs.tz(date).format("YYYY-MM-DD"),
      })}
      label={title}
      title={title}
      excerpt={excerpt}
      readMore={t("news.post.read-more")}
    />
  );
}

HomeNewsSectionItem.Hero = HeroVariant;

export default HomeNewsSectionItem;
