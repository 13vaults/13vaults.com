import {
  allAncestries,
  Ancestry,
  allClassItems,
  allRulesDocuments,
} from "contentlayer/generated";
import { flow, find, map, get } from "lodash";
import { GetStaticPropsResult, NextPageContext } from "next";
import ContentLayerPage from "@/components/content-layer-page";
import { buildNav, Navigation } from "@/lib/navigation";

interface AncestryPageP {
  ancestry: Ancestry;
  navigation: Navigation;
}

export default function AncestryPage({ ancestry, navigation }: AncestryPageP) {
  return (
    <ContentLayerPage
      data={ancestry}
      primaryLabel={ancestry.name}
      secondaryLabel={ancestry.source}
      navigation={navigation}
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: map(allAncestries, (ancestry) => ({
      params: { ancestry: ancestry.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: NextPageContext
): Promise<GetStaticPropsResult<AncestryPageP>> {
  const ancestry = flow((ancestries) =>
    find(ancestries, ["slug", get(context, "params.ancestry")])
  )(allAncestries);

  return {
    props: {
      ancestry,
      navigation: buildNav({
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
    },
  };
}
