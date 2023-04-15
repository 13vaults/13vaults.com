import { buildNav, Navigation } from "@/lib/navigation";
import Head from "next/head";
import {
  allAncestries,
  allRulesDocuments,
  allClassItems,
  allBlogPosts,
  BlogPost,
} from "@/.contentlayer/generated";
import { map, get, filter, pick, size, orderBy } from "lodash";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getI18nProperties } from "@/lib/get-static";
import { useTranslation } from "next-i18next";
import BasicLayout from "@/layouts/basic";
import Container from "@/components/container";
import CompendiumTitle from "@/components/compendium-title";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { PickPartial } from "@/utils";
import clsx from "clsx";

dayjs.extend(utc);

type BlogPostItem = PickPartial<
  BlogPost,
  "excerpt" | "date" | "title" | "slug" | "published"
>;

interface BlogIndexPageP {
  blogPosts: BlogPostItem[];
  navigation: Navigation;
}

export default function BlogIndexPage({
  blogPosts,
  navigation,
}: BlogIndexPageP) {
  const { t } = useTranslation("blog");
  const unpublishedStyles =
    "border-yellow-500 bg-amber-200 hover:border-yellow-600 border-4";

  return (
    <>
      <Head>
        <title>{t("html-title")}</title>
      </Head>

      <BasicLayout navigation={navigation}>
        <div className="p-4 lg:p-8 flex-1">
          <Container className="flex flex-col gap-8">
            <CompendiumTitle className="mt-2 mb-6">
              {t("title")}
            </CompendiumTitle>
            <div>
              {size(blogPosts) > 0 ? (
                <ol role="list" className="flex flex-col gap-4">
                  {map(orderBy(blogPosts, ["date"], ["desc"]), (post) => (
                    <li role="listitem" key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className={clsx(
                          "flex flex-col gap-4 shadow p-4 rounded text-stone-900 dark:text-stone-50 bg-stone-50 dark:bg-stone-800 transition-all hover:shadow-lg border-2 border-stone-300 hover:border-teal-500 dark:border-stone-700",
                          { [unpublishedStyles]: !post.published }
                        )}
                      >
                        <div className="flex flex-col">
                          {post.published ? null : (
                            <span className="bg-red-500 font-bold uppercase text-white p-2 mb-2">
                              {t("unpublished-dev-label")}
                            </span>
                          )}
                          <h2 className="font-display font-bold text-2xl">
                            {post.title}
                          </h2>
                          <time className="text-xs">
                            {t("published-on-label", {
                              date: dayjs(Date.parse(post.date))
                                .utc()
                                .format("YYYY-MM-DD"),
                            })}
                          </time>
                        </div>
                        <div>
                          <p className="mb-2">{post.excerpt}</p>
                          <p className="italic">{t("read-more")}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <div>{t("no-posts")}</div>
              )}
            </div>
          </Container>
        </div>
      </BasicLayout>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<BlogIndexPageP>> {
  return {
    props: {
      blogPosts: map(
        process.env.NODE_ENV === "production"
          ? filter(allBlogPosts, ["published", true])
          : allBlogPosts,
        (post) => pick(post, ["title", "date", "excerpt", "slug", "published"])
      ),
      navigation: buildNav({
        locale: get(context, "locale"),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common", "blog"])),
    },
  };
}
