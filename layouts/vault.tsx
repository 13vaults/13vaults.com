import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import Container from "@/components/container";
import BasicLayout from "./basic";
import { Navigation } from "@/lib/navigation";

interface VaultLayoutP {
  children: React.ReactNode;
  navigation: Navigation;
}

export default function VaultLayout({ children, navigation }: VaultLayoutP) {
  return (
    <BasicLayout navigation={navigation}>
      <div className="bg-stone-900 px-4 lg:px-8">
        <CompendiumBreadcrumbs />
      </div>
      <main className="p-4 lg:p-8">
        <Container>
          <article
            className="
              prose prose-h1:my-0 prose-h2:mt-0 prose-p:text-justify max-w-none
              prose-headings:font-serif prose-lead:leading-normal prose-lead:font-display
            prose-blockquote:border-teal-500 prose-blockquote:bg-white dark:prose-blockquote:bg-stone-800
            dark:prose-blockquote:text-white prose-blockquote:font-serif prose-blockquote:shadow-md prose-table:text-sm
              prose-table:whitespace-nowrap prose-th:font-display prose-thead:whitespace-normal
              prose-th:p-2 prose-thead:shadow-sm prose-th:align-bottom prose-thead:bg-white dark:prose-thead:bg-stone-800
              prose-blockquote:pr-6 dark:prose-invert dark:prose-tr:border-stone-800 dark:prose-thead:border-stone-900"
          >
            {children}
          </article>
        </Container>
      </main>
    </BasicLayout>
  );
}
