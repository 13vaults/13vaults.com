import Container from "@/components/container";
import BasicLayout from "./basic";
import { Navigation } from "@/lib/navigation";
import { motion } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { MouseEvent, useCallback } from "react";
import Prose from "@/components/prose";

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
  const handleScrollToTop = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      history.replaceState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    },
    []
  );

  return (
    <BasicLayout navigation={navigation}>
      <div className="p-4 lg:p-8">
        <Container className="grid grid-cols-1 gap-6 xl:grid-cols-12 relative">
          <aside
            key={
              typeof window === "undefined"
                ? undefined
                : window.location.pathname
            }
            className="static xl:col-start-1 xl:col-end-4"
          >
            <div className="sticky overflow-y-auto top-20 bottom-4 rounded pb-1 dark:bg-stone-800 dark:text-stone-100 dark:border-stone-700 bg-stone-50 border border-stone-300 shadow xl:max-h-[calc(100vh-6.5rem)]">
              {sideNavigation}
            </div>
          </aside>
          <main className="xl:col-start-4 xl:col-end-13 flex flex-col">
            <Prose as="article">{children}</Prose>
          </main>
        </Container>
      </div>

      <motion.button
        onClick={handleScrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed bottom-4 right-4 flex gap-1 items-center p-2 rounded-full bg-white shadow"
      >
        <ChevronUpIcon className="h-4 w-4" />
      </motion.button>
    </BasicLayout>
  );
}
