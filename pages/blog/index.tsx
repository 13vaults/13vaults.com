import { buildNav, Navigation } from "@/lib/navigation";
import Head from "next/head";
import {
  allAncestries,
  allRulesDocuments,
  allClassItems,
  allBlogPosts,
  BlogPost,
} from "@/.contentlayer/generated";
import { map, get, filter, pick, size, orderBy } from "lodash-es";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getI18nProperties } from "@/lib/get-static";
import { useTranslation } from "next-i18next";
import BasicLayout from "@/layouts/basic";
import Container from "@/components/container";
import CompendiumTitle from "@/components/compendium-title";
import { PickPartial } from "@/utils";
import BlogIndexPostList from "@/components/blog-index-post-list";

export type BlogPostItem = PickPartial<
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
                <BlogIndexPostList
                  blogPosts={orderBy(blogPosts, ["date"], ["desc"])}
                />
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
