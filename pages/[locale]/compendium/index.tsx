import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import Head from "next/head";
import Link from "next/link";
import { buildNav, Navigation } from "@/lib/navigation";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import {
  allAncestries,
  allClassItems,
  allRulesDocuments,
} from "@/.contentlayer/generated";
import { get, map } from "lodash";
import { useRouter } from "next/router";
import { defaultLocale, supportedLocales } from "@/lib/locales";
import { getI18nProperties } from "@/lib/get-static";

interface CompendiumCategoryPageP {
  navigation: Navigation;
}

export default function CompendiumCategoryPage({
  navigation,
}: CompendiumCategoryPageP) {
  const router = useRouter();
  const { locale = defaultLocale } = router.query;
  const localeString = String(locale);
  return (
    <>
      <Head>
        <title>Compendium - 13 Vaults</title>
      </Head>
      <CompendiumCategoryIndexLayout navigation={navigation}>
        <ul>
          <li>
            <Link href={`/${localeString}/compendium/basic-rules`}>
              Basic Rules
            </Link>
          </li>
          <li>
            <Link href={`/${localeString}/compendium/races`}>Races</Link>
          </li>
          <li>
            <Link href={`/${localeString}/compendium/classes`}>Classes</Link>
          </li>
          <li>Monsters</li>
          <li>Magic Items</li>
        </ul>
      </CompendiumCategoryIndexLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: map(supportedLocales, (locale) => `/${locale}/compendium/`),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<CompendiumCategoryPageP>> {
  return {
    props: {
      navigation: buildNav({
        locale: String(get(context, "params.locale")),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common"])),
    },
  };
}
