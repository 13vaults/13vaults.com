import { BlogPostItem } from "@/pages/blog";
import { map } from "lodash-es";
import BlogPostListItem from "./blog-post-list-item";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";

interface BlogIndexPostListP {
  blogPosts: BlogPostItem[];
}

export default function BlogIndexPostList({ blogPosts }: BlogIndexPostListP) {
  const [firstPost, ...restPosts] = blogPosts;
  const { t } = useTranslation("blog");
  return (
    <ol className="flex flex-col gap-4">
      {firstPost ? (
        <li aria-label={firstPost.title}>
          <BlogPostListItem.Hero
            to={`/blog/${firstPost.slug}`}
            published={firstPost.published}
            date={t("published-on-label", {
              date: dayjs.tz(firstPost.date).format("YYYY-MM-DD"),
            })}
            label={firstPost.title}
            excerpt={firstPost.excerpt}
            readMore={t("read-more")}
            title={firstPost.title}
          />
        </li>
      ) : null}
      {map(restPosts, (post) => (
        <li key={post.slug} aria-label={post.title}>
          <BlogPostListItem
            to={`/blog/${post.slug}`}
            published={post.published}
            date={t("published-on-label", {
              date: dayjs.tz(post.date).format("YYYY-MM-DD"),
            })}
            label={post.title}
            excerpt={post.excerpt}
            readMore={t("read-more")}
            title={post.title}
          />
        </li>
      ))}
    </ol>
  );
}
