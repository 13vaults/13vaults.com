import { RulesDocument, ClassItem, Ancestry } from "@/.contentlayer/generated";
import { filter, map } from "lodash";
import { defaultLocale } from "./locales";

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
  locale = defaultLocale,
  rulesDocuments,
  classItems,
  ancestries,
}: {
  locale?: string;
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
            href: `/${locale}/compendium/basic-rules/`,
            items: map(
              filter(rulesDocuments, ["locale", locale]),
              (rulesDocument) => ({
                name: rulesDocument.title,
                href: `/${locale}/compendium/basic-rules/${rulesDocument.slug}`,
              })
            ),
          },
          {
            name: "Races",
            href: `/${locale}/compendium/races/`,
            large: true,
            items: map(filter(ancestries, ["locale", locale]), (ancestry) => ({
              name: ancestry.name,
              href: `/${locale}/compendium/races/${ancestry.slug}`,
            })),
          },
          {
            name: "Classes",
            href: `/${locale}/compendium/classes`,
            large: true,
            items: map(filter(classItems, ["locale", locale]), (classItem) => ({
              name: classItem.name,
              href: `/${locale}/compendium/classes/${classItem.slug}`,
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
