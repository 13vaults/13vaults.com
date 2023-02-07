import CompendiumBreadcrumbs from "@/components/compendium-breadcrumbs";
import Container from "@/components/container";
import BasicLayout from "./basic";
import { Navigation } from "@/lib/navigation";
import { motion } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";

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
  const handleScrollToTop = useCallback((e: any) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    history.replaceState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }, []);

  return (
    <BasicLayout navigation={navigation}>
      <div className="bg-stone-900 px-4 lg:px-8 sticky top-14 z-10 shadow">
        <CompendiumBreadcrumbs />
      </div>
      <div className="p-4 lg:p-8">
        <Container className="grid grid-cols-1 gap-6 xl:grid-cols-12 relative">
          <aside className="static xl:col-start-1 xl:col-end-4">
            <div className="sticky overflow-y-auto top-24 bottom-4 rounded pb-1 dark:bg-stone-800 dark:text-stone-100 dark:border-stone-700 bg-stone-50 border border-stone-400 shadow max-h-[calc(100vh-6.5rem)]">
              {sideNavigation}
            </div>
          </aside>
          <main className="xl:col-start-4 xl:col-end-13">
            <article
              className="prose prose-h1:my-0 prose-h2:mt-4 prose-p:text-justify max-w-none
                         prose-headings:font-serif prose-lead:leading-normal prose-lead:font-display prose-table:my-2
                         prose-blockquote:border-teal-500 prose-blockquote:bg-white dark:prose-blockquote:bg-stone-800
                         dark:prose-blockquote:text-white prose-blockquote:font-serif prose-blockquote:shadow-md prose-table:text-sm
                         prose-th:font-display prose-th:font-medium prose-th:text-sm prose-table:whitespace-nowrap
                         prose-th:p-2 prose-thead:shadow-sm prose-th:align-bottom prose-thead:bg-white dark:prose-thead:bg-stone-800
                         prose-blockquote:pr-6 dark:prose-invert dark:prose-tr:border-stone-800 dark:prose-thead:border-stone-900
                         prose-teal prose-table:bg-stone-50 dark:prose-table:bg-stone-900 prose-td:px-2 even:prose-tr:bg-stone-100 dark:even:prose-tr:bg-stone-800"
            >
              {children}
            </article>
          </main>
        </Container>
      </div>

      <motion.button
        onClick={handleScrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="xl:hidden fixed bottom-4 right-4 flex gap-1 items-center p-2 rounded-full bg-white shadow"
      >
        <ChevronUpIcon className="h-4 w-4" />
      </motion.button>
    </BasicLayout>
  );
}
