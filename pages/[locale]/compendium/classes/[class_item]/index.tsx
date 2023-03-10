import {
  allClassItems,
  ClassItem,
  allAncestries,
  allRulesDocuments,
} from "contentlayer/generated";
import { find, map, get, flatMap } from "lodash";
import { GetStaticPropsResult, NextPageContext } from "next";
import ContentLayerPage from "@/components/content-layer-page";
import { buildNav, Navigation } from "@/lib/navigation";
import { getI18nProperties } from "@/lib/get-static";
import { defaultLocale, supportedLocales } from "@/lib/locales";

interface ClassPageP {
  classItem: ClassItem;
  navigation: Navigation;
}

export default function ClassPage({ classItem, navigation }: ClassPageP) {
  return (
    <ContentLayerPage
      data={classItem}
      primaryLabel={classItem.name}
      secondaryLabel={classItem.source}
      navigation={navigation}
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: flatMap(supportedLocales, (locale) =>
      map(allClassItems, (classItem) => ({
        params: {
          locale: locale,
          slug: classItem.slug,
          class_item: classItem.slug,
        },
      }))
    ),
    fallback: false,
  };
}

export async function getStaticProps(
  context: NextPageContext
): Promise<GetStaticPropsResult<ClassPageP>> {
  const classItem =
    find(allClassItems, {
      slug: get(context, "params.class_item"),
      locale: get(context, "params.locale"),
    }) ||
    find(allClassItems, {
      slug: get(context, "params.class_item"),
      locale: defaultLocale,
    })!;

  return {
    props: {
      classItem,
      navigation: buildNav({
        locale: String(get(context, "params.locale", defaultLocale)),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common"])),
    },
  };
}
