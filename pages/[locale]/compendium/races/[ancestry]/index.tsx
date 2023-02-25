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
import { getI18nProperties } from "@/lib/get-static";

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
      params: { locale: ancestry.locale, ancestry: ancestry.slug },
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
        locale: get(context, "params.locale"),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common"])),
    },
  };
}
