import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import BasicLayout from "@/layouts/basic";
import Link from "next/link";

export default function CompendiumCategoryIndexLayout(props: any) {
  return (
    <BasicLayout>
      <div className="bg-stone-900 px-8">
        <CompendiumBreadcrumbs />
      </div>
      <main className="p-8">
        <div className="mx-auto xl:max-w-7xl max-w-6xl">
          <main>
            <ul>
              <li>
                <Link href="/compendium/races">Races</Link>
              </li>
              <li>
                <Link href="/compendium/classes">Classes</Link>
              </li>
            </ul>
          </main>
        </div>
      </main>
    </BasicLayout>
  );
}
