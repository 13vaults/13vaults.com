import { buildNav, Navigation } from "@/lib/navigation";
import Head from "next/head";
import {
  allAncestries,
  allRulesDocuments,
  allClassItems,
  allBlogPosts,
  BlogPost,
} from "@/.contentlayer/generated";
import { map, get, find } from "lodash";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getI18nProperties } from "@/lib/get-static";
import { useTranslation } from "next-i18next";
import BasicLayout from "@/layouts/basic";
import Container from "@/components/container";
import { useMDXComponent } from "next-contentlayer/hooks";
import * as Vault from "@/components/vault-components";
import ContentLink from "@/components/content-link";
import Prose from "@/components/prose";
import dayjs from "dayjs";

interface BlogPostPageP {
  blogPost: BlogPost;
  navigation: Navigation;
}

export default function BlogPostPage({ blogPost, navigation }: BlogPostPageP) {
  const { t } = useTranslation("blog");
  const Content = useMDXComponent(blogPost.body.code);

  return (
    <>
      <Head>
        <title>{t("post-html-title", { title: blogPost.title })}</title>
        <meta name="description" content={blogPost.excerpt} />
      </Head>

      <BasicLayout navigation={navigation}>
        <div className="px-4 pt-4 pb-8 lg:px-8 lg:pt-8 lg:pb-12">
          <Container as="article" className="flex flex-col gap-8">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-stone-900 dark:text-stone-200 my-2 md:my-4">
              {blogPost.title}
            </h1>
            <Prose>
              <p>
                {t("published-on-label", {
                  date: dayjs(blogPost.date).format("YYYY-MM-DD"),
                })}
              </p>
              <Content
                components={{
                  Vault: Vault,
                  a: ({ href, ...properties }: any) => (
                    <ContentLink href={href} {...properties} />
                  ),
                  table: (properties: any) => (
                    <div className="overflow-auto border dark:border-stone-700 rounded shadow bg-white dark:bg-stone-700 border-stone-300 my-2">
                      <table {...properties} />
                    </div>
                  ),
                }}
              />
            </Prose>
          </Container>
        </div>
      </BasicLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: map(allBlogPosts, (post) => ({
      params: {
        locale: post.locale,
        "blog-post": post.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<BlogPostPageP>> {
  return {
    props: {
      blogPost: find(allBlogPosts, ["slug", get(context, "params.blog-post")])!,
      navigation: buildNav({
        locale: String(get(context, "params.locale")),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common", "blog"])),
    },
  };
}
