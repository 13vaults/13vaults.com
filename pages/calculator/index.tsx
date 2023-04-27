import { buildNav, Navigation } from "@/lib/navigation";
import Head from "next/head";
import {
  allAncestries,
  allRulesDocuments,
  allClassItems,
} from "@/.contentlayer/generated";
import { get } from "lodash";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getI18nProperties } from "@/lib/get-static";
import BasicLayout from "@/layouts/basic";
import EncounterCalculator from "@/components/encounter-calculator";

interface EncounterCalculatorP {
  navigation: Navigation;
}

export default function EncounterCalculatorPage({
  navigation,
}: EncounterCalculatorP) {
  return (
    <>
      <Head>
        <title>Encounter Calculator - 13 Vaults</title>
      </Head>

      <BasicLayout navigation={navigation}>
        <EncounterCalculator />
      </BasicLayout>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<EncounterCalculatorP>> {
  return {
    props: {
      navigation: buildNav({
        locale: get(context, "locale"),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common", "calculator"])),
    },
  };
}
