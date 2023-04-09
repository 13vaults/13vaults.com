import BasicLayout from "@/layouts/basic";
import { find, get, map } from "lodash";
import { buildNav, Navigation } from "@/lib/navigation";
import { GetStaticPropsResult, NextPageContext } from "next";
import {
  allAncestries,
  allBasicPages,
  allClassItems,
  allRulesDocuments,
  BasicPage,
} from "@/.contentlayer/generated";
import Head from "next/head";
import { useMDXComponent } from "next-contentlayer/hooks";
import Container from "@/components/container";
import { getI18nProperties } from "@/lib/get-static";
import { defaultLocale } from "@/lib/locales";

interface VaultsBasicPageP {
  pageData: BasicPage;
  navigation: Navigation;
}

export default function VaultsBasicPage({
  navigation,
  pageData,
}: VaultsBasicPageP) {
  const Content = useMDXComponent(pageData.body.code);
  const titleString = `${pageData.title} - 13 Vaults`;
  return (
    <>
      <Head>
        <title>{titleString}</title>
        <meta
          name="description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta property="og:locale" content={pageData.locale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={titleString} />
        <meta
          name="twitter:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta
          name="twitter:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={titleString} />
        <meta
          property="og:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta
          property="og:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
      </Head>
      <BasicLayout navigation={navigation}>
        <div className="p-4 lg:p-8 bg-stone-50 dark:bg-stone-900 flex-1">
          <Container>
            <main className="xl:col-start-4 xl:col-end-13 flex flex-col ">
              <article
                className="prose prose-h1:my-0 prose-h2:mt-4 max-w-none
                         prose-headings:font-serif prose-lead:leading-normal prose-lead:font-display prose-table:my-2
                         prose-blockquote:border-teal-500 prose-blockquote:bg-white dark:prose-blockquote:bg-stone-800
                         dark:prose-blockquote:text-white prose-blockquote:font-serif prose-blockquote:shadow-md
                         prose-th:font-display prose-th:font-medium
                         prose-th:p-2 prose-thead:shadow-sm prose-th:align-bottom prose-thead:bg-white dark:prose-thead:bg-stone-800
                         prose-blockquote:pr-6 dark:prose-invert dark:prose-tr:border-stone-800 dark:prose-thead:border-stone-900
                         prose-teal prose-table:bg-stone-50 dark:prose-table:bg-stone-900 prose-td:px-2 even:prose-tr:bg-stone-100 dark:even:prose-tr:bg-stone-800"
              >
                <Content />
              </article>
            </main>
          </Container>
        </div>
      </BasicLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: map(allBasicPages, (basicPage) => ({
      params: { locale: basicPage.locale, "basic-page": basicPage.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: NextPageContext
): Promise<GetStaticPropsResult<VaultsBasicPageP>> {
  const pageData =
    find(allBasicPages, {
      slug: get(context, "params.basic-page"),
      locale: get(context, "params.locale"),
    }) ||
    find(allBasicPages, {
      slug: get(context, "params.basic-page"),
      locale: defaultLocale,
    })!;
  return {
    props: {
      pageData,
      navigation: buildNav({
        locale: String(get(context, "params.locale", defaultLocale)),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common"])),
    },
  };
}
