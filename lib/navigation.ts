import { RulesDocument, ClassItem, Ancestry } from "@/.contentlayer/generated";
import { filter, map } from "lodash";
import { defaultLocale } from "./locales";

interface SubNav {
  name: string;
  labelKey: string;
  href: string;
  large?: boolean;
  items?: SubNavWithName[];
}

type SubNavWithName = Omit<SubNav, "labelKey">;

type SubNavWithLabel = Omit<SubNav, "name">;

interface MainNavItem {
  labelKey: string;
  subnavs: SubNavWithLabel[];
}

interface Page {
  labelKey: string;
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
        labelKey: "nav.compendium-label",
        subnavs: [
          {
            labelKey: "nav.compendium-basic-rules-label",
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
            labelKey: "nav.compendium-ancestries-label",
            href: `/${locale}/compendium/races/`,
            large: true,
            items: map(filter(ancestries, ["locale", locale]), (ancestry) => ({
              name: ancestry.name,
              href: `/${locale}/compendium/races/${ancestry.slug}`,
            })),
          },
          {
            labelKey: "nav.compendium-classes-label",
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
        labelKey: "nav.guides-label",
      },
      {
        labelKey: "nav.encounter-builder-label",
      },
      {
        labelKey: "nav.battle-calculator-label",
        href: `/${locale}/calculator`,
      },
    ],
  };
}
