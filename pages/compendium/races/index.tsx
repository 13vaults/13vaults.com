import {
  allAncestries,
  allClassItems,
  allRulesDocuments,
} from "contentlayer/generated";
import { map, pick } from "lodash";
import { GetStaticPropsResult } from "next";
import Link from "next/link";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import Head from "next/head";
import { buildNav, Navigation } from "@/lib/navigation";

interface AncestriesPageP {
  ancestries: {
    slug: string;
    name: string;
  }[];
  navigation: Navigation;
}

export default function AncestriesPage({
  ancestries,
  navigation,
}: AncestriesPageP) {
  return (
    <>
      <Head>
        <title>Races - 13 Vaults</title>
      </Head>
      <CompendiumCategoryIndexLayout navigation={navigation}>
        <ul>
          {map(ancestries, (ancestry) => (
            <li key={ancestry.slug}>
              <Link href={`/compendium/races/${ancestry.slug}`}>
                {ancestry.name}
              </Link>
            </li>
          ))}
        </ul>
      </CompendiumCategoryIndexLayout>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<AncestriesPageP>
> {
  return {
    props: {
      ancestries: map(allAncestries, (ancestry) =>
        pick(ancestry, ["slug", "name"])
      ),
      navigation: buildNav({
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
    },
  };
}
