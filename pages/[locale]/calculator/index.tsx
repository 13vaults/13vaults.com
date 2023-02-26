import { useState } from "react";
import { supportedLocales } from "@/lib/locales";
import { buildNav, Navigation } from "@/lib/navigation";
import Head from "next/head";
import {
  allAncestries,
  allRulesDocuments,
  allClassItems,
} from "@/.contentlayer/generated";
import { map, get, toInteger } from "lodash";
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

  // Calculate the values
  const meqBudget = [0, 1, 2, 3, 5, 7, 9, 11][state.playerCount];
  const mookFactor = [0, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5][state.level];
  let eliteMookFactor: number | string = mookFactor * 1.5;
  if (eliteMookFactor !== toInteger(eliteMookFactor)) {
    const low = Math.floor(eliteMookFactor);
    const high = Math.ceil(eliteMookFactor);
    eliteMookFactor = `${low}-${high}`;
  }
  const parLevelBase =
    state.level < 5
      ? state.level
      : state.level < 8
      ? state.level + 1
      : state.level + 2;
  const parLevel = state.battlecount === 4 ? parLevelBase : parLevelBase + 1;

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
        <h1>Battle Budget Calculator</h1>

        <p>
          Budget for a standard battle: <strong>{meqBudget} MEQ</strong>
        </p>

        <div className="overflow-auto border dark:border-stone-700 rounded shadow bg-white dark:bg-stone-700 border-stone-300 my-2">
          <table>
            <thead>
              <tr>
                <th>Monster level</th>
                <th>Standard / {mookFactor} mooks</th>
                <th>Elite / {eliteMookFactor} mooks</th>
                <th>2x / large / {mookFactor * 2} mooks</th>
                <th>3x / huge / {mookFactor * 3} mooks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{parLevel - 2}</td>
                <td>0.5</td>
                <td>0.7</td>
                <td>1</td>
                <td>1.5</td>
              </tr>
              <tr>
                <td>{parLevel - 1}</td>
                <td>0.7</td>
                <td>1</td>
                <td>1.5</td>
                <td>2</td>
              </tr>
              <tr>
                <td>
                  <strong>{parLevel}</strong>
                </td>
                <td>
                  <strong>1</strong>
                </td>
                <td>
                  <strong>1.5</strong>
                </td>
                <td>
                  <strong>2</strong>
                </td>
                <td>
                  <strong>3</strong>
                </td>
              </tr>
              <tr>
                <td>{parLevel + 1}</td>
                <td>1.5</td>
                <td>2*</td>
                <td>3*</td>
                <td>4*</td>
              </tr>
              <tr>
                <td>{parLevel + 2}</td>
                <td>2*</td>
                <td>3**</td>
                <td>4**</td>
                <td>6**</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <em>
            * Be careful. A monster like this might pack an uncomfortable amount
            of damage into a single swing.
          </em>
        </p>
        <p>
          <em>
            ** Probably a mistake to build a battle around monsters that dish
            out damage like these do.
          </em>
        </p>
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
