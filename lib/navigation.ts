import { RulesDocument, ClassItem, Ancestry } from "@/.contentlayer/generated";
import { map } from "lodash";
import { localeContentLayerList } from "./locale-utils";
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
        labelKey: "compendium-label",
        subnavs: [
          {
            labelKey: "compendium-basic-rules-label",
            href: `/${locale}/compendium/basic-rules/`,
            items: map(
              localeContentLayerList<RulesDocument>(
                locale,
                defaultLocale,
                rulesDocuments
              ),
              (rulesDocument) => ({
                name: rulesDocument.title,
                href: `/${locale}/compendium/basic-rules/${rulesDocument.slug}`,
              })
            ),
          },
          {
            labelKey: "compendium-ancestries-label",
            href: `/${locale}/compendium/races/`,
            large: true,
            items: map(
              localeContentLayerList<Ancestry>(
                locale,
                defaultLocale,
                ancestries
              ),
              (ancestry) => ({
                name: ancestry.name,
                href: `/${locale}/compendium/races/${ancestry.slug}`,
              })
            ),
          },
          {
            labelKey: "compendium-classes-label",
            href: `/${locale}/compendium/classes`,
            large: true,
            items: map(
              localeContentLayerList<ClassItem>(
                locale,
                defaultLocale,
                classItems
              ),
              (classItem) => ({
                name: classItem.name,
                href: `/${locale}/compendium/classes/${classItem.slug}`,
              })
            ),
          },
        ],
      },
    ],
    pages: [
      {
        labelKey: "blog-label",
        href: `/${locale}/blog`,
      },
      {
        labelKey: "guides-label",
      },
      {
        labelKey: "encounter-builder-label",
      },
      {
        labelKey: "battle-calculator-label",
        href: `/${locale}/calculator`,
      },
    ],
  };
}
