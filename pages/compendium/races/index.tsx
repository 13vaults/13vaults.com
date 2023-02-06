import { allAncestries } from "contentlayer/generated";
import { map, pick } from "lodash";
import { GetStaticPropsResult } from "next";
import Link from "next/link";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import Head from "next/head";

interface AncestriesPageP {
  ancestries: {
    slug: string;
    name: string;
  }[];
}

export default function AncestriesPage({ ancestries }: AncestriesPageP) {
  return (
    <>
      <Head>
        <title>Races - 13 Vaults</title>
      </Head>
      <CompendiumCategoryIndexLayout>
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
    },
  };
}
