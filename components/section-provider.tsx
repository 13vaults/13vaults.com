import {
  RefObject,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { StoreApi, createStore, useStore } from "zustand";
import { remToPx } from "@/lib/rem-to-px";

type Section = {
  id: string;
  content: string;
  headingRef: RefObject<HTMLHeadingElement>;
  ref: RefObject<HTMLHeadingElement>;
  offsetRem: number;
};

interface SectionStore {
  sections: Section[];
  visibleSections: string[];
  setVisibleSections: (_newSections: string[]) => void;
}

function createSectionStore(sections: Section[]) {
  return createStore<SectionStore>((set) => ({
    sections,
    visibleSections: [],
    setVisibleSections: (newVisibleSections: string[]) => {
      set((state) =>
        state.visibleSections.join(",") === newVisibleSections.join(",")
          ? {}
          : { visibleSections: newVisibleSections }
      );
    },
    registerHeading: ({ id, ref, offsetRem }: Section) =>
      set((state) => {
        return {
          sections: state.sections.map((section) => {
            if (section.id === id) {
              return {
                ...section,
                headingRef: ref,
                offsetRem,
              };
            }
            return section;
          }),
        };
      }),
  }));
}

function useVisibleSections(sectionStore: StoreApi<SectionStore>) {
  const setVisibleSections = useStore(
    sectionStore,
    (s) => s.setVisibleSections
  );
  const sections = useStore(sectionStore, (s) => s.sections);

  useEffect(() => {
    function checkVisibleSections() {
      const { innerHeight, scrollY } = window;
      const newVisibleSections = [];

      for (
        let sectionIndex = 0;
        sectionIndex < sections.length;
        sectionIndex++
      ) {
        const { id, headingRef, offsetRem } = sections[sectionIndex];
        const offset = remToPx(offsetRem);
        const top = headingRef?.current?.getBoundingClientRect().top! + scrollY;

        if (sectionIndex === 0 && top - offset > scrollY) {
          newVisibleSections.push("_top");
        }

        const nextSection = sections[sectionIndex + 1];
        const bottom =
          (nextSection?.headingRef?.current?.getBoundingClientRect().top ??
            Number.POSITIVE_INFINITY) +
          scrollY -
          remToPx(nextSection?.offsetRem ?? 0);

        if (
          (top > scrollY && top < scrollY + innerHeight) ||
          (bottom > scrollY && bottom < scrollY + innerHeight) ||
          (top <= scrollY && bottom >= scrollY + innerHeight)
        ) {
          newVisibleSections.push(id);
        }
      }

      setVisibleSections(newVisibleSections);
    }

    const raf = window.requestAnimationFrame(() => checkVisibleSections());
    window.addEventListener("scroll", checkVisibleSections, { passive: true });
    window.addEventListener("resize", checkVisibleSections);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", checkVisibleSections);
      window.removeEventListener("resize", checkVisibleSections);
    };
  }, [setVisibleSections, sections]);
}

const SectionStoreContext = createContext<StoreApi<SectionStore> | null>(null);

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

interface SectionProviderP {
  sections: Section[];
  children: JSX.Element;
}
export function SectionProvider({ sections, children }: SectionProviderP) {
  const [sectionStore] = useState(() => createSectionStore(sections));

  useVisibleSections(sectionStore);

  useIsomorphicLayoutEffect(() => {
    sectionStore.setState({ sections });
  }, [sectionStore, sections]);

  return (
    <SectionStoreContext.Provider value={sectionStore}>
      {children}
    </SectionStoreContext.Provider>
  );
}

export function useSectionStore<T>(selector: (_state: SectionStore) => T) {
  const store = useContext(SectionStoreContext);
  return useStore(store!, selector);
}
