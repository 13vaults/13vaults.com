import {
  allAncestries,
  Ancestry,
  allClassItems,
  allRulesDocuments,
} from "contentlayer/generated";
import { find, map, get, flatMap } from "lodash-es";
import { GetStaticPropsResult, NextPageContext } from "next";
import ContentLayerPage from "@/components/content-layer-page";
import { buildNav, Navigation } from "@/lib/navigation";
import { getI18nProperties } from "@/lib/get-static";
import { defaultLocale, supportedLocales } from "@/lib/locales";
import { useTranslation } from "react-i18next";

interface AncestryPageP {
  ancestry: Ancestry;
  navigation: Navigation;
}

export default function AncestryPage({ ancestry, navigation }: AncestryPageP) {
  const { t } = useTranslation("common");

  return (
    <ContentLayerPage
      data={ancestry}
      primaryLabel={ancestry.name}
      secondaryLabel={ancestry.source}
      navigation={navigation}
      goBackLabel={t("go-back-races-label")}
      goBackLink="/compendium/races"
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: flatMap(supportedLocales, (locale) =>
      map(allAncestries, (ancestry) => ({
        params: { ancestry: ancestry.slug },
        locale: locale,
      }))
    ),
    fallback: false,
  };
}

export async function getStaticProps(
  context: NextPageContext
): Promise<GetStaticPropsResult<AncestryPageP>> {
  const ancestry =
    find(allAncestries, {
      slug: get(context, "params.ancestry"),
      locale: get(context, "locale"),
    }) ||
    find(allAncestries, {
      slug: get(context, "params.ancestry"),
      locale: defaultLocale,
    })!;

  return {
    props: {
      ancestry,
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
