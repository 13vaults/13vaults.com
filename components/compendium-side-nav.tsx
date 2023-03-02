import { remToPx } from "@/lib/rem-to-px";
import useInitialValue from "@/lib/use-initial-value";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { AnimatePresence, useIsPresent, motion } from "framer-motion";
import { size } from "lodash";
import { ReactNode, useCallback } from "react";
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
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "flex justify-between gap-2 py-1 pr-3 text-sm transition",
        "pl-3",
        "text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white"
      )}
    >
      <span className="pointer-events-none truncate">{children}</span>
    </a>
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
    ? Math.max(
        1,
        visibleSections[0] === "_top"
          ? visibleSections.length - 1
          : visibleSections.length
      ) * itemHeight
    : itemHeight;
  const top = 16 + firstVisibleSectionIndex * itemHeight;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="hidden xl:block absolute inset-x-1 top-0 bg-black/5 will-change-transform dark:bg-white/5 pointer-events-none"
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

  const handleScrollToTop = useCallback((event: any) => {
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
  }, []);

  return (
    <div>
      {size(sections) > 0 ? (
        <AnimatePresence initial={true}>
          <VisibleSectionHighlight />
        </AnimatePresence>
      ) : null}
      <div>
        <p className="font-medium font-display text-xl m-2 truncate">
          {primaryLabel}
        </p>
      </div>
      <nav role="navigation" aria-label="Side navigation">
        <ul role="list" className="flex flex-col">
          {sections.map((section: any) => (
            <NavigationGroup key={section.id} section={section} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
