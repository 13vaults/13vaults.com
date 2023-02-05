import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import Container from "@/components/container";
import BasicLayout from "./basic";

export default function VaultLayout(props: any) {
  return (
    <BasicLayout>
      <div className="bg-stone-900 px-8">
        <CompendiumBreadcrumbs />
      </div>
      <main className="p-8">
        <Container>
          <article
            className="
              prose prose-h1:my-0 prose-h2:mt-0 prose-p:text-justify max-w-none
              prose-headings:font-serif prose-lead:leading-normal prose-lead:font-display
            prose-blockquote:border-teal-500 prose-blockquote:bg-white
              prose-blockquote:font-serif prose-blockquote:shadow-md prose-table:text-sm
              prose-table:whitespace-nowrap prose-th:font-display prose-thead:whitespace-normal
              prose-th:p-2 prose-thead:shadow-sm prose-th:align-bottom prose-thead:bg-white prose-blockquote:pr-6"
            {...props}
          />
        </Container>
      </main>
    </BasicLayout>
  );
}
