import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import Container from "@/components/container";
import BasicLayout from "./basic";
import { Navigation } from "@/lib/navigation";
import useMediaQuery from "@/lib/useMediaQuery";
import useIsMounted from "@/lib/useIsMounted";
import { useEffect, useState } from "react";

interface VaultLayoutP {
  children: React.ReactNode;
  navigation: Navigation;
  sideNavigation: React.ReactNode;
}

export default function VaultLayout({
  children,
  navigation,
  sideNavigation,
}: VaultLayoutP) {
  const isMounted = useIsMounted();
  const [showSideNavigation, setShowSideNavigation] = useState(false);
  const isWide = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    if (isMounted() && isWide) {
      setShowSideNavigation(true);
    } else {
      setShowSideNavigation(false);
    }
  }, [isMounted, isWide]);

  return (
    <BasicLayout navigation={navigation}>
      <div className="bg-stone-900 px-4 lg:px-8">
        <CompendiumBreadcrumbs />
      </div>
      <div className="p-4 lg:p-8">
        <Container className="grid grid-cols-1 gap-6 xl:grid-cols-12 relative">
          <aside className="static xl:col-start-1 xl:col-end-4">
            <div className="sticky overflow-y-scroll top-4 bottom-4 pb-1 dark:bg-stone-800 dark:text-stone-100 dark:border-stone-700 bg-amber-50 border border-stone-400 shadow max-h-[calc(100vh-2rem)]">
              {sideNavigation}
            </div>
          </aside>
          <main className="xl:col-start-4 xl:col-end-12">
            <article
              className="prose prose-h1:my-0 prose-h2:mt-0 prose-p:text-justify max-w-none
                       prose-headings:font-serif prose-lead:leading-normal prose-lead:font-display
                     prose-blockquote:border-teal-500 prose-blockquote:bg-white dark:prose-blockquote:bg-stone-800
                     dark:prose-blockquote:text-white prose-blockquote:font-serif prose-blockquote:shadow-md prose-table:text-sm
                       prose-table:whitespace-nowrap prose-th:font-display prose-thead:whitespace-normal
                       prose-th:p-2 prose-thead:shadow-sm prose-th:align-bottom prose-thead:bg-white dark:prose-thead:bg-stone-800
                       prose-blockquote:pr-6 dark:prose-invert dark:prose-tr:border-stone-800 dark:prose-thead:border-stone-900"
            >
              {children}
            </article>
          </main>
        </Container>
      </div>
    </BasicLayout>
  );
}
