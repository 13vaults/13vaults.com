import {
  allRulesDocuments,
  RulesDocument,
  allAncestries,
  allClassItems,
} from "@/.contentlayer/generated";
import { find, flatMap, get, map } from "lodash";
import { GetStaticPropsResult, NextPageContext } from "next";
import ContentLayerPage from "@/components/content-layer-page";
import { buildNav, Navigation } from "@/lib/navigation";
import { getI18nProperties } from "@/lib/get-static";
import { defaultLocale, supportedLocales } from "@/lib/locales";

interface RulesDocumentPageP {
  rulesDocument: RulesDocument;
  navigation: Navigation;
}

export default function RulesDocumentPage({
  rulesDocument,
  navigation,
}: RulesDocumentPageP) {
  return (
    <ContentLayerPage
      navigation={navigation}
      data={rulesDocument}
      primaryLabel={rulesDocument.title}
      secondaryLabel={rulesDocument.source}
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: flatMap(supportedLocales, (locale) =>
      map(allRulesDocuments, (rulesDocument) => ({
        params: {
          locale: locale,
          rules_document: rulesDocument.slug,
        },
      }))
    ),
    fallback: false,
  };
}

export async function getStaticProps(
  context: NextPageContext
): Promise<GetStaticPropsResult<RulesDocumentPageP>> {
  const rulesDocument = find(allRulesDocuments, {
    slug: get(context, "params.rules_document"),
    locale: get(context, "params.locale", defaultLocale),
  });

  return {
    props: {
      rulesDocument: rulesDocument!,
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
