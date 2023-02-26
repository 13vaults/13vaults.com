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
import { useTranslation } from "next-i18next";

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

  const { t } = useTranslation("calculator");

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
              <label htmlFor="playercount">
                {t("form-players-label", { players: state.playerCount })}
              </label>
            </p>
            <input
              type="range"
              min="1"
              max="7"
              id="playercount"
              value={state.playerCount}
              onChange={(event) =>
                setState((state) => ({
                  ...state,
                  playerCount: Number.parseInt(event.target.value),
                }))
              }
            />

            <p>
              <label htmlFor="level">
                {t("form-level-label", { level: state.level })}
              </label>
            </p>
            <input
              id="level"
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
              <label htmlFor="battle-count">
                {t("form-daily-battles-label", { battles: state.battleCount })}
              </label>
            </p>
            <input
              id="battle-count"
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
        <h1>{t("title")}</h1>

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
