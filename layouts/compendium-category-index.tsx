import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import Container from "@/components/container";
import BasicLayout from "./basic";

export default function CompendiumCategoryIndexLayout(props: any) {
  return (
    <BasicLayout>
      <div className="bg-stone-900 px-8">
        <CompendiumBreadcrumbs />
      </div>
      <main className="p-8">
        <Container>
          <main {...props} />
        </Container>
      </main>
    </BasicLayout>
  );
}
