import {
  allRulesDocuments,
  RulesDocument,
  allAncestries,
  allClassItems,
} from "@/.contentlayer/generated";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import { chunk, get, map, pick } from "lodash";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";
import Link from "next/link";
import { buildNav, Navigation } from "@/lib/navigation";
import { useRouter } from "next/router";
import { defaultLocale, supportedLocales } from "@/lib/locales";
import { getI18nProperties } from "@/lib/get-static";
import CompendiumContentSection from "@/components/compendium-content-section";
import { PickPartial } from "@/utils";
import { localeContentLayerList } from "@/lib/locale-utils";

type DocumentListing = PickPartial<
  RulesDocument,
  "slug" | "title" | "sections" | "locale"
>;

interface BasicRulesPageP {
  rulesDocuments: DocumentListing[];
  navigation: Navigation;
}

export default function BasicRulesPage({
  rulesDocuments,
  navigation,
}: BasicRulesPageP) {
  const router = useRouter();
  const { locale = defaultLocale } = router.query;
  const localeString = String(locale);

  return (
    <>
      <Head>
        <title>Basic Rules - 13 Vaults</title>
        <meta
          name="description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta property="og:locale" content={localeString} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Basic Rules - 13 Vaults" />
        <meta
          name="twitter:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta
          name="twitter:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Basic Rules - 13 Vaults" />
        <meta
          property="og:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta
          property="og:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
      </Head>
      <CompendiumCategoryIndexLayout navigation={navigation}>
        <div className="flex flex-col gap-4">
          {map(
            localeContentLayerList<DocumentListing>(
              localeString,
              defaultLocale,
              rulesDocuments
            ),
            (document) => (
              <CompendiumContentSection
                key={document.slug}
                header={
                  <Link
                    href={`/${localeString}/compendium/basic-rules/${document.slug}`}
                  >
                    {document.title}
                  </Link>
                }
              >
                <ol
                  role="list"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {map(
                    chunk(
                      document.sections,
                      Math.ceil(document.sections.length / 2)
                    ),
                    (sectionChunk, index) => (
                      <li key={index}>
                        <ol
                          className="list-decimal list-inside flex flex-col gap-4"
                          start={
                            index * Math.ceil(document.sections.length / 2) + 1
                          }
                        >
                          {map(sectionChunk, (section) => (
                            <li key={get(section, "id")}>
                              <Link
                                href={`/${localeString}/compendium/basic-rules/${
                                  document.slug
                                }#${get(section, "id")}`}
                              >
                                {get(section, "title")}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      </li>
                    )
                  )}
                </ol>
              </CompendiumContentSection>
            )
          )}
        </div>
      </CompendiumCategoryIndexLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: map(
      supportedLocales,
      (locale) => `/${locale}/compendium/basic-rules/`
    ),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<BasicRulesPageP>> {
  return {
    props: {
      rulesDocuments: map(allRulesDocuments, (rulesDocument) =>
        pick(rulesDocument, ["slug", "title", "sections", "locale"])
      ),
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
