import {
  allAncestries,
  allClassItems,
  allRulesDocuments,
} from "contentlayer/generated";
import { get, map, pick } from "lodash";
import { GetStaticPathsContext, GetStaticPropsResult } from "next";
import Link from "next/link";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import Head from "next/head";
import { buildNav, Navigation } from "@/lib/navigation";
import { useRouter } from "next/router";
import { defaultLocale, supportedLocales } from "@/lib/locales";

interface ClassesPageP {
  classItems: {
    slug: string;
    name: string;
  }[];
  navigation: Navigation;
}

export default function AncestriesPage({
  classItems,
  navigation,
}: ClassesPageP) {
  const router = useRouter();
  const { locale = defaultLocale } = router.query;
  const localeString = String(locale);
  return (
    <>
      <Head>
        <title>Classes - 13 Vaults</title>
      </Head>
      <CompendiumCategoryIndexLayout navigation={navigation}>
        <ul>
          {map(classItems, (classItem) => (
            <li key={classItem.slug}>
              <Link
                hrefLang={localeString}
                href={`/${localeString}/compendium/classes/${classItem.slug}`}
              >
                {classItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </CompendiumCategoryIndexLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: map(supportedLocales, (locale) => `/${locale}/compendium/classes/`),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPathsContext
): Promise<GetStaticPropsResult<ClassesPageP>> {
  return {
    props: {
      classItems: map(allClassItems, (classItem) =>
        pick(classItem, ["slug", "name"])
      ),
      navigation: buildNav({
        locale: get(context, "params.locale"),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
    },
  };
}
