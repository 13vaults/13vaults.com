import { useState } from "react";
import { supportedLocales } from "@/lib/locales";
import { buildNav, Navigation } from "@/lib/navigation";
import Head from "next/head";
import {
  allAncestries,
  allRulesDocuments,
  allClassItems,
} from "@/.contentlayer/generated";
import { map, get } from "lodash";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { getI18nProperties } from "@/lib/get-static";
import VaultLayout from "@/layouts/vault";
import EncounterTable from "@/components/encounter-table";

interface EncounterCalculatorP {
  navigation: Navigation;
}

export default function EncounterCalculator({
  navigation,
}: EncounterCalculatorP) {
  const [state, setState] = useState(() => ({
    playerCount: 4,
    battleCount: 4,
    level: 1,
  }));

  // Calculate the values

  return (
    <>
      <Head>
        <title>Encounter Calculator - 13 Vaults</title>
      </Head>

      <VaultLayout
        navigation={navigation}
        sideNavigation={
          <>
            <p>
              <label htmlFor="playercount">Players: {state.playerCount}</label>
            </p>
            <input
              type="range"
              min="1"
              max="7"
              value={state.playerCount}
              onChange={(event) =>
                setState((state) => ({
                  ...state,
                  playerCount: Number.parseInt(event.target.value),
                }))
              }
            />

            <p>
              <label htmlFor="level">Level: {state.level}</label>
            </p>
            <input
              type="range"
              min="1"
              max="10"
              value={state.level}
              onChange={(event) =>
                setState((state) => ({
                  ...state,
                  level: Number.parseInt(event.target.value),
                }))
              }
            />

            <p>
              <label htmlFor="level">Battles/day: {state.battleCount}</label>
            </p>
            <input
              type="range"
              min="3"
              max="4"
              value={state.battleCount}
              onChange={(event) =>
                setState((state) => ({
                  ...state,
                  battleCount: Number.parseInt(event.target.value),
                }))
              }
            />
          </>
        }
      >
        <h1>Battle Budget Calculator</h1>

        <EncounterTable
          playerCount={state.playerCount}
          battleCount={state.battleCount}
          level={state.level}
        />
      </VaultLayout>
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
      ...(await getI18nProperties(context, ["common", "calculator"])),
    },
  };
}
