import { allClassItems, ClassItem } from "contentlayer/generated";
import { flow, find, map, get } from "lodash";
import { GetStaticPropsResult, NextPageContext } from "next";
import ContentLayerPage from "@/components/content-layer-page";

interface ClassPageP {
  classItem: ClassItem;
}

export default function ClassPage({ classItem }: ClassPageP) {
  return (
    <ContentLayerPage
      data={classItem}
      primaryLabel={classItem.name}
      secondaryLabel={classItem.source}
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: map(allClassItems, (classItem) => ({
      params: { slug: classItem.slug, class_item: classItem.slug },
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
    },
  };
}
