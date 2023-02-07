import { remToPx } from "@/lib/remToPx";
import useInitialValue from "@/lib/useInitialValue";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { AnimatePresence, useIsPresent, motion } from "framer-motion";
import { get } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, ReactNode, useCallback, useEffect } from "react";
import { useSectionStore } from "./section-provider";

function NavLink({
  href,
  active = false,
  children,
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();

  const handleClick = useCallback((e: any) => {
    const hash = get(e, "target.hash");
    const el = document.querySelector(hash);
    if (el) {
      e.preventDefault();
      history.replaceState(
        "",
        document.title,
        window.location.pathname + window.location.search + hash
      );
      el.scrollIntoView({ smooth: true });
    }
  }, []);

  return (
    <Link
      scroll={false}
      href={href}
      onClick={handleClick}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "flex justify-between gap-2 py-1 pr-3 text-sm transition",
        "pl-3",
        "text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white"
      )}
    >
      <span className="pointer-events-none truncate">{children}</span>
    </Link>
  );
}

function VisibleSectionHighlight() {
  const [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s: any) => s.sections),
      useSectionStore((s: any) => s.visibleSections),
    ],
    false
  );

  const isPresent = useIsPresent();
  const firstVisibleSectionIndex =
    visibleSections[0] === "_top"
      ? 1
      : Math.max(
          0,
          [{ id: "_top" }, ...sections].findIndex(
            (section) => section.id === visibleSections[0]
          )
        );
  const itemHeight = remToPx(1.75);
  const height = isPresent
    ? Math.max(1, visibleSections[0] === "_top" ? 1 : visibleSections.length) *
      itemHeight
    : itemHeight;
  const top = 16 + firstVisibleSectionIndex * itemHeight;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 1 }}
      className="hidden xl:block absolute inset-x-1 top-0 bg-black/5 will-change-transform dark:bg-white/5 z-[-1]"
      style={{ borderRadius: 3, height, top }}
    />
  );
}

function NavigationGroup({ section }: any) {
  return (
    <li>
      <NavLink href={`#${section.id}`}>{section.title}</NavLink>
    </li>
  );
}

export default function CompendiumSideNav({
  primaryLabel,
}: {
  primaryLabel: string;
}): JSX.Element | null {
  const sections = useSectionStore((store: any) => store.sections);
  const [firstVisible] = useSectionStore((store: any) => store.visibleSections);
  const isAtTop = firstVisible === "_top";

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
    <>
      <motion.div layout="position">
        <AnimatePresence initial={false}>
          <VisibleSectionHighlight />
        </AnimatePresence>
        <div className="flex justify-between items-center">
          <p className="font-medium font-display text-xl m-2">{primaryLabel}</p>
          <AnimatePresence>
            {isAtTop ? null : (
              <motion.button
                onClick={handleScrollToTop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden relative xl:flex gap-1 items-center px-2 py-1 text-xs"
              >
                To Top <ChevronUpIcon className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            role="list"
            className="flex flex-col"
          >
            {sections.map((section: any) => (
              <NavigationGroup key={section.id} section={section} />
            ))}
          </motion.ul>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
