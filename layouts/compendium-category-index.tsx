import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import Container from "@/components/container";
import { Navigation } from "@/lib/navigation";
import BasicLayout from "./basic";

export default function CompendiumCategoryIndexLayout({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: Navigation;
}) {
  return (
    <BasicLayout navigation={navigation}>
      <div className="bg-stone-900 px-4 lg:px-8">
        <CompendiumBreadcrumbs />
      </div>
      <main className="p-4 lg:p-8 dark:text-white">
        <Container>
          <div>{children}</div>
        </Container>
      </main>
    </BasicLayout>
  );
}
