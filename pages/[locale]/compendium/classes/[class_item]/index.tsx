import {
  allClassItems,
  ClassItem,
  allAncestries,
  allRulesDocuments,
} from "contentlayer/generated";
import { flow, find, map, get } from "lodash";
import { GetStaticPropsResult, NextPageContext } from "next";
import ContentLayerPage from "@/components/content-layer-page";
import { buildNav, Navigation } from "@/lib/navigation";

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
    paths: map(allClassItems, (classItem) => ({
      params: {
        locale: classItem.locale,
        slug: classItem.slug,
        class_item: classItem.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: NextPageContext
): Promise<GetStaticPropsResult<ClassPageP>> {
  const classItem = flow((classes) =>
    find(classes, ["slug", get(context, "params.class_item")])
  )(allClassItems);

  return {
    props: {
      classItem,
      navigation: buildNav({
        locale: get(context, "params.locale"),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
    },
  };
}
