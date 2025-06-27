import { useState } from "react";
import Prose from "./prose";
import EncounterTable from "./encounter-table";
import Container from "./container";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";

export default function EncounterCalculator() {
  const [state, setState] = useState(() => ({
    partyLevel: 1,
    battleLevel: 1,
  }));

  const { t } = useTranslation("calculator");

  return (
    <div className="p-4 lg:p-8">
      <Container className="flex flex-col gap-8">
        <Prose>
          <h1>{t("title")}</h1>

          <p>
            <Trans
              t={t}
              i18nKey="encounter-rules-info"
              components={{
                "rules-link": (
                  <Link href="/compendium/basic-rules/running-the-game" />
                ),
              }}
            />
          </p>

          <h3>{t("budget-header")}</h3>
          <div className="overflow-auto w-min max-w-full border dark:border-stone-700 rounded shadow bg-white dark:bg-stone-700 border-stone-300 my-2">
            <table>
              <thead>
                <tr>
                  <th>{t("budget-players-header")}</th>
                  <th>{t("budget-players-cell-single")}</th>
                  <th>{t("budget-players-cell", {n: 2})}</th>
                  <th>{t("budget-players-cell", {n: 3})}</th>
                  <th>{t("budget-players-cell", {n: 4})}</th>
                  <th>{t("budget-players-cell", {n: 5})}</th>
                  <th>{t("budget-players-cell", {n: 6})}</th>
                  <th>{t("budget-players-cell", {n: 7})}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t("budget-monsters-header")}</td>
                  <td>{t("budget-monsters-cell", {n: 1})}</td>
                  <td>{t("budget-monsters-cell", {n: 2})}</td>
                  <td>{t("budget-monsters-cell", {n: 3})}</td>
                  <td>{t("budget-monsters-cell", {n: 5})}</td>
                  <td>{t("budget-monsters-cell", {n: 7})}</td>
                  <td>{t("budget-monsters-cell", {n: 9})}</td>
                  <td>{t("budget-monsters-cell", {n: 11})}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>{t("table-header")}</h3>
          <div className="p-4 bg-stone-50 dark:bg-stone-800 dark:text-stone-50 shadow rounded flex flex-col gap-4 justify-between" style={{ marginTop: "1rem" }}>
            <div className="flex flex-col flex-1">
              <p>
                <label htmlFor="level">
                  {t("form-party-level", { level: state.partyLevel })}
                </label>
              </p>
              <input
                id="level"
                type="range"
                min="1"
                max="10"
                value={state.partyLevel}
                onChange={(event) =>{
                  const partyLevel = Number.parseInt(event.target.value);
                  let battleLevel = partyLevel;
                  if (partyLevel >= 5) battleLevel++;
                  if (partyLevel >= 8) battleLevel++;
                  return setState({
                    ...state,
                    partyLevel,
                    battleLevel,
                  })
                }}
              />
            </div>

            <div className="flex flex-col flex-1">
              <p>
                <label htmlFor="battle-level">
                  {t("form-battle-level", {
                    level: state.battleLevel,
                  })}
                </label>
              </p>
              <input
                id="battle-level"
                type="range"
                min="1"
                max="14"
                value={state.battleLevel}
                onChange={(event) =>
                  setState({
                    ...state,
                    battleLevel: Number.parseInt(event.target.value),
                  })
                }
              />
            </div>
          </div>

          <EncounterTable
            battleLevel={state.battleLevel}
          />
        </Prose>
      </Container>
    </div>
  );
}
