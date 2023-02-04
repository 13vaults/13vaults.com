import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import BasicLayout from "./basic";

export default function CompendiumCategoryIndexLayout(props: any) {
  return (
    <BasicLayout>
      <div className="bg-stone-900 px-8">
        <CompendiumBreadcrumbs />
      </div>
      <main className="p-8">
        <div className="mx-auto xl:max-w-7xl max-w-6xl">
          <main {...props} />
        </div>
      </main>
    </BasicLayout>
  );
}
