import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import Head from "next/head";
import Link from "next/link";
import { buildNav, Navigation } from "@/lib/navigation";
import { GetStaticPropsResult } from "next";
import {
  allAncestries,
  allClassItems,
  allRulesDocuments,
} from "@/.contentlayer/generated";

interface CompendiumCategoryPageP {
  navigation: Navigation;
}

export default function CompendiumCategoryPage({
  navigation,
}: CompendiumCategoryPageP) {
  return (
    <>
      <Head>
        <title>Compendium - 13 Vaults</title>
      </Head>
      <CompendiumCategoryIndexLayout navigation={navigation}>
        <ul>
          <li>
            <Link href="/compendium/basic-rules">Basic Rules</Link>
          </li>
          <li>
            <Link href="/compendium/races">Races</Link>
          </li>
          <li>
            <Link href="/compendium/classes">Classes</Link>
          </li>
          <li>Monsters</li>
          <li>Magic Items</li>
        </ul>
      </CompendiumCategoryIndexLayout>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<CompendiumCategoryPageP>
> {
  return {
    props: {
      navigation: buildNav({
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
    },
  };
}
