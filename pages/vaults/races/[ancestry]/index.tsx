import { allAncestries, Ancestry } from "contentlayer/generated";
import { flow, find, map, get } from "lodash";
import { GetStaticPropsResult, NextPageContext } from "next";
import ContentLayerPage from "@/components/content-layer-page";

interface AncestryPageP {
  ancestry: Ancestry;
}

export default function AncestryPage({ ancestry }: AncestryPageP) {
  return (
    <ContentLayerPage
      data={ancestry}
      primaryLabel={ancestry.name}
      secondaryLabel={ancestry.source}
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
    },
  };
}
