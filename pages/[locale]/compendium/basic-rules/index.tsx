import {
  allRulesDocuments,
  RulesDocument,
  allAncestries,
  allClassItems,
} from "@/.contentlayer/generated";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import { find, map, pick } from "lodash";
import { GetStaticPropsResult } from "next";
import Head from "next/head";
import Link from "next/link";
import { buildNav, Navigation } from "@/lib/navigation";
import { useRouter } from "next/router";
import { defaultLocale, supportedLocales } from "@/lib/locales";

type PickPartial<T, K extends keyof T> = { [P in K]: Partial<T[P]> };

type DocumentListing = PickPartial<RulesDocument, "slug" | "title">;

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
  const combatRulesDocument = find(rulesDocuments, [
    "slug",
    "combat-rules",
  ]) as DocumentListing;
  const runningTheGameDocument = find(rulesDocuments, [
    "slug",
    "running-the-game",
  ]) as DocumentListing;
  const characterCreationDocument = find(rulesDocuments, [
    "slug",
    "character-creation",
  ]) as DocumentListing;

  return (
    <>
      <Head>
        <title>Basic Rules - 13 Vaults</title>
      </Head>
      <CompendiumCategoryIndexLayout navigation={navigation}>
        <nav>
          <ol>
            <li>
              <Link
                href={`/${localeString}/compendium/basic-rules/${combatRulesDocument.slug}`}
              >
                {combatRulesDocument.title}
              </Link>
            </li>
            <li>
              <Link
                href={`/${localeString}/compendium/basic-rules/${runningTheGameDocument.slug}`}
              >
                {runningTheGameDocument.title}
              </Link>
            </li>
            <li>
              <Link
                href={`/${localeString}/compendium/basic-rules/${characterCreationDocument.slug}`}
              >
                {characterCreationDocument.title}
              </Link>
            </li>
          </ol>
        </nav>
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

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BasicRulesPageP>
> {
  return {
    props: {
      rulesDocuments: map(allRulesDocuments, (rulesDocument) =>
        pick(rulesDocument, ["slug", "title"])
      ),
      navigation: buildNav({
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
    },
  };
}
