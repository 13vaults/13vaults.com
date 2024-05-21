import { RulesDocument, ClassItem, Ancestry } from "@/.contentlayer/generated";
import { map } from "lodash-es";
import { localeContentLayerList } from "./locale-utils";
import { defaultLocale } from "./locales";

export interface SubNav {
  name: string;
  labelKey: string;
  href: string;
  large?: boolean;
  items?: SubNavWithName[];
}

export type SubNavWithName = Omit<SubNav, "labelKey">;

export type SubNavWithLabel = Omit<SubNav, "name">;

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
            href: "/compendium/basic-rules/",
            items: map(
              localeContentLayerList<RulesDocument>(
                locale,
                defaultLocale,
                rulesDocuments
              ),
              (rulesDocument) => ({
                name: rulesDocument.title,
                href: `/compendium/basic-rules/${rulesDocument.slug}`,
              })
            ),
          },
          {
            labelKey: "compendium-ancestries-label",
            href: "/compendium/races/",
            large: true,
            items: map(
              localeContentLayerList<Ancestry>(
                locale,
                defaultLocale,
                ancestries
              ),
              (ancestry) => ({
                name: ancestry.name,
                href: `/compendium/races/${ancestry.slug}`,
              })
            ),
          },
          {
            labelKey: "compendium-classes-label",
            href: "/compendium/classes",
            large: true,
            items: map(
              localeContentLayerList<ClassItem>(
                locale,
                defaultLocale,
                classItems
              ),
              (classItem) => ({
                name: classItem.name,
                href: `/compendium/classes/${classItem.slug}`,
              })
            ),
          },
        ],
      },
    ],
    pages: [
      {
        labelKey: "battle-calculator-label",
        href: "/calculator",
      },
      {
        labelKey: "nav.discord-server",
        href: "https://discord.gg/m9DbPC6RsC",
      },
    ],
  };
}
