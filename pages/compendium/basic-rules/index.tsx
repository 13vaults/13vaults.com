import { allRulesDocuments, RulesDocument } from "@/.contentlayer/generated";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import { find, map, pick } from "lodash";
import { GetStaticPropsResult } from "next";
import Head from "next/head";
import Link from "next/link";

type PickPartial<T, K extends keyof T> = { [P in K]: Partial<T[P]> };

type DocListing = PickPartial<RulesDocument, "slug" | "title">;

interface BasicRulesPageP {
  rulesDocuments: DocListing[];
}

export default function BasicRulesPage({ rulesDocuments }: BasicRulesPageP) {
  const combatRulesDoc = find(rulesDocuments, [
    "slug",
    "combat-rules",
  ]) as DocListing;
  const runningTheGameDoc = find(rulesDocuments, [
    "slug",
    "running-the-game",
  ]) as DocListing;
  const characterCreationDoc = find(rulesDocuments, [
    "slug",
    "character-creation",
  ]) as DocListing;

  return (
    <>
      <Head>
        <title>Basic Rules - The 13 Vaults</title>
      </Head>
      <CompendiumCategoryIndexLayout>
        <nav>
          <ol>
            <li>
              <Link href={`/compendium/basic-rules/${combatRulesDoc.slug}`}>
                {combatRulesDoc.title}
              </Link>
            </li>
            <li>
              <Link href={`/compendium/basic-rules/${runningTheGameDoc.slug}`}>
                {runningTheGameDoc.title}
              </Link>
            </li>
            <li>
              <Link
                href={`/compendium/basic-rules/${characterCreationDoc.slug}`}
              >
                {characterCreationDoc.title}
              </Link>
            </li>
          </ol>
        </nav>
      </CompendiumCategoryIndexLayout>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BasicRulesPageP>
> {
  return {
    props: {
      rulesDocuments: map(allRulesDocuments, (rulesDocument) =>
        pick(rulesDocument, ["slug", "title"])
      ),
    },
  };
}
