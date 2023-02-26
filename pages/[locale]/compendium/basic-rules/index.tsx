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

type DocumentListing = PickPartial<
  RulesDocument,
  "slug" | "title" | "sections"
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
      </Head>
      <CompendiumCategoryIndexLayout navigation={navigation}>
        <div className="flex flex-col gap-4">
          {map(rulesDocuments, (document) => (
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
              <ol role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          ))}
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
        pick(rulesDocument, ["slug", "title", "sections"])
      ),
      navigation: buildNav({
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common"])),
    },
  };
}
