import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import Container from "@/components/container";
import BasicLayout from "@/layouts/basic";
import Head from "next/head";
import Link from "next/link";

export default function CompendiumCategoryIndexLayout() {
  return (
    <>
      <Head>
        <title>Compendium - The 13 Vaults</title>
      </Head>
      <BasicLayout>
        <div className="bg-stone-900 px-8">
          <CompendiumBreadcrumbs />
        </div>
        <main className="p-8">
          <Container>
            <main>
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
            </main>
          </Container>
        </main>
      </BasicLayout>
    </>
  );
}
