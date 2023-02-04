import { allRulesDocuments, RulesDocument } from "@/.contentlayer/generated";
import { find, get, map } from "lodash";
import { GetStaticPropsResult, NextPageContext } from "next";
import ContentLayerPage from "@/components/content-layer-page";

interface RulesDocumentPageP {
  rulesDocument: RulesDocument;
}

export default function RulesDocumentPage({
  rulesDocument,
}: RulesDocumentPageP) {
  return (
    <ContentLayerPage
      data={rulesDocument}
      primaryLabel={rulesDocument.title}
      secondaryLabel={rulesDocument.source}
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: map(allRulesDocuments, (rulesDocument) => ({
      params: { rules_document: rulesDocument.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: NextPageContext
): Promise<GetStaticPropsResult<RulesDocumentPageP>> {
  const rulesDocument = find(allRulesDocuments, [
    "slug",
    get(context, "params.rules_document"),
  ]);

  return {
    props: {
      rulesDocument: rulesDocument!,
    },
  };
}
