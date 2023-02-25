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

interface EncounterCalculatorP {
  navigation: Navigation;
}

export default function EncounterCalculator({
  navigation,
}: EncounterCalculatorP) {
  const [state, setState] = useState(() => ({
    playerCount: 4,
    level: 1,
    battlecount: 4,
  }));

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
              onChange={(ev) =>
                setState((state) => ({
                  ...state,
                  playerCount: parseInt(ev.target.value),
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
              onChange={(ev) =>
                setState((state) => ({
                  ...state,
                  level: parseInt(ev.target.value),
                }))
              }
            />

            <p>
              <label htmlFor="level">Battles/day: {state.battlecount}</label>
            </p>
            <input
              type="range"
              min="3"
              max="4"
              value={state.battlecount}
              onChange={(ev) =>
                setState((state) => ({
                  ...state,
                  battlecount: parseInt(ev.target.value),
                }))
              }
            />
          </>
        }
      >
        <h1>Player count: {state.playerCount}</h1>
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
      ...(await getI18nProperties(context, ["home", "common"])),
    },
  };
}
