import { RulesDocument, ClassItem, Ancestry } from "@/.contentlayer/generated";
import { map } from "lodash";

interface SubNav {
  name: string;
  href: string;
  large?: boolean;
  items?: SubNav[];
}

interface MainNavItem {
  name: string;
  subnavs: SubNav[];
}

interface Page {
  name: string;
  href?: string;
}

export interface Navigation {
  main: MainNavItem[];
  pages: Page[];
}

export function buildNav({
  rulesDocuments,
  classItems,
  ancestries,
}: {
  rulesDocuments: RulesDocument[];
  classItems: ClassItem[];
  ancestries: Ancestry[];
}): Navigation {
  return {
    main: [
      {
        name: "Compendium",
        subnavs: [
          {
            name: "Basic Rules",
            href: "/compendium/basic-rules/",
            items: map(rulesDocuments, (doc) => ({
              name: doc.title,
              href: `/compendium/basic-rules/${doc.slug}`,
            })),
          },
          {
            name: "Races",
            href: "/compendium/races/",
            large: true,
            items: map(ancestries, (ancestry) => ({
              name: ancestry.name,
              href: `/compendium/races/${ancestry.slug}`,
            })),
          },
          {
            name: "Classes",
            href: "/compendium/classes",
            large: true,
            items: map(classItems, (classItem) => ({
              name: classItem.name,
              href: `/compendium/classes/${classItem.slug}`,
            })),
          },
        ],
      },
    ],
    pages: [
      {
        name: "Guides",
      },
      {
        name: "Encounter Builder",
      },
    ],
  };
}
