import { supportedLocales } from "@/lib/locales";
import { buildNav, Navigation } from "@/lib/navigation";
import Head from "next/head";
import BasicLayout from "@/layouts/basic";
import {
  allAncestries,
  allRulesDocuments,
  allClassItems,
} from "@/.contentlayer/generated";
import { map, get } from "lodash";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getI18nProperties } from "@/lib/get-static";

interface EncounterCalculatorP {
  navigation: Navigation;
}

export default function EncounterCalculator({
  navigation,
}: EncounterCalculatorP) {
  return (
    <>
      <Head>
        <title>Encounter Calculator - 13 Vaults</title>
      </Head>

      <BasicLayout navigation={navigation}>
        <div className="bg-stone-900 px-4 lg:px-8">
          <h1>abc</h1>
        </div>
      </BasicLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: map(supportedLocales, (locale) => `/${locale}/calculator`),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<EncounterCalculatorP>> {
  return {
    props: {
      navigation: buildNav({
        locale: String(get(context, "params.locale")),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["home", "common"])),
    },
  };
}
