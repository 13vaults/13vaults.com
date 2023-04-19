import { PickPartial } from "@/utils";
import HomeNewsSectionItem from "./home-news-section-item";
import { BlogPost } from "@/.contentlayer/generated";
import { map, size } from "lodash";
import { useTranslation } from "next-i18next";

type BlogPostItem = PickPartial<
  BlogPost,
  "date" | "published" | "slug" | "excerpt" | "title"
>;

interface HomeNewsSectionP {
  heroPost: BlogPostItem;
  extraPosts: BlogPostItem[];
}

export default function HomeNewsSection({
  heroPost,
  extraPosts = [],
}: HomeNewsSectionP) {
  const { t } = useTranslation("home");

  return (
    <nav aria-label={t("latest-posts-blog") || ""}>
      <div
        role="list"
        className="flex flex-col gap-2 p-2 bg-stone-50 dark:bg-stone-700"
      >
        <HomeNewsSectionItem.Hero
          title={heroPost.title}
          slug={heroPost.slug}
          published={heroPost.published}
          date={heroPost.date}
          excerpt={heroPost.excerpt}
        />
        {size(extraPosts) > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 auto-rows-fr">
            {map(extraPosts, (post) => (
              <HomeNewsSectionItem
                key={post.slug}
                title={post.title}
                slug={post.slug}
                published={post.published}
                date={post.date}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
