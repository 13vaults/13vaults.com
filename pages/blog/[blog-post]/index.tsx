import { buildNav, Navigation } from "@/lib/navigation";
import Head from "next/head";
import {
  allAncestries,
  allRulesDocuments,
  allClassItems,
  allBlogPosts,
  BlogPost,
} from "@/.contentlayer/generated";
import { map, get, find, flatMap } from "lodash";
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
import BlogHero from "@/components/blog-hero";
import Image from "next/image";
import { supportedLocales } from "@/lib/locales";

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            t("post-html-title", { title: blogPost.title }) || blogPost.title
          }
        />
        <meta name="twitter:description" content={blogPost.excerpt} />
        <meta
          name="twitter:image"
          content={`https://www.13vaults.com/api/og-image.png?title=${encodeURIComponent(
            blogPost.title
          )}`}
        />
        <meta property="og:site_name" content="13 Vaults" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content={blogPost.locale} />
        <meta
          property="og:title"
          content={
            t("post-html-title", { title: blogPost.title }) || blogPost.title
          }
        />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta
          property="og:image"
          content={`https://www.13vaults.com/api/og-image.png?title=${encodeURIComponent(
            blogPost.title
          )}`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="article:published_time" content={blogPost.date} />
      </Head>

      <BasicLayout navigation={navigation}>
        <Container
          as="article"
          maxWidth="max-w-4xl"
          maxWidthXl="max-w-4xl"
          maxWidth2xl="max-w-4xl"
          className="flex flex-col bg-white dark:bg-stone-950 shadow w-full flex-1"
        >
          <BlogHero title={blogPost.title} />
          <div className="flex flex-col gap-8 px-4 pt-4 pb-8 lg:px-8 lg:pt-8 lg:pb-12">
            <div>
              <h1 className="font-display-serif font-bold text-3xl md:text-4xl text-stone-900 dark:text-stone-200 my-2 md:my-4">
                {blogPost.title}
              </h1>
              <time className="font-serif">
                {t("published-on-label", {
                  date: dayjs.tz(blogPost.date).format("YYYY-MM-DD"),
                })}
              </time>
            </div>
            <Prose>
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
                  img: ({ alt, height = "0", width = "0", src }) => (
                    <div className="p-4 bg-white/50 rounded dark:bg-black/50 border border-stone-200 dark:border-stone-700">
                      <figure>
                        <Image
                          src={src || ""}
                          alt={alt || ""}
                          height={Number.parseInt(String(height), 10)}
                          width={Number.parseInt(String(width), 10)}
                          className="mx-auto rounded shadow"
                          quality={100 * (2 / 3)}
                        />
                      </figure>
                      <figcaption>{alt}</figcaption>
                    </div>
                  ),
                }}
              />
            </Prose>
          </div>
        </Container>
      </BasicLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: flatMap(supportedLocales, (locale) =>
      map(allBlogPosts, (post) => ({
        params: {
          "blog-post": post.slug,
        },
        locale: locale,
      }))
    ),
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
        locale: get(context, "locale"),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common", "blog"])),
    },
  };
}
