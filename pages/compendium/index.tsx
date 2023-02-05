import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import Container from "@/components/container";
import BasicLayout from "@/layouts/basic";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import Head from "next/head";
import Link from "next/link";

export default function CompendiumCategoryPage() {
  return (
    <>
      <Head>
        <title>Compendium - The 13 Vaults</title>
      </Head>
      <CompendiumCategoryIndexLayout>
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
