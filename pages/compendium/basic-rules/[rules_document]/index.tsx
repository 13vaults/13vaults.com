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
import { useTranslation } from "react-i18next";

interface RulesDocumentPageP {
  rulesDocument: RulesDocument;
  navigation: Navigation;
}

export default function RulesDocumentPage({
  rulesDocument,
  navigation,
}: RulesDocumentPageP) {
  const { t } = useTranslation("common");

  return (
    <ContentLayerPage
      navigation={navigation}
      data={rulesDocument}
      goBackLabel={t("go-back-rules-label")}
      goBackLink={`/compendium/basic-rules`}
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
          rules_document: rulesDocument.slug,
        },
        locale: locale,
      }))
    ),
    fallback: false,
  };
}

export async function getStaticProps(
  context: NextPageContext
): Promise<GetStaticPropsResult<RulesDocumentPageP>> {
  const rulesDocument =
    find(allRulesDocuments, {
      slug: get(context, "params.rules_document"),
      locale: get(context, "locale"),
    }) ||
    find(allRulesDocuments, {
      slug: get(context, "params.rules_document"),
      locale: defaultLocale,
    });

  return {
    props: {
      rulesDocument: rulesDocument || null!,
      navigation: buildNav({
        locale: get(context, "locale"),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common"])),
    },
  };
}
