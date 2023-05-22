import { toInteger } from "lodash-es";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";

interface EncounterTableP {
  playerCount: number;
  battleCount: number;
  level: number;
}
export default function EncounterTable({
  playerCount,
  level,
  battleCount: battlecount,
}: EncounterTableP) {
  const meqBudget = [0, 1, 2, 3, 5, 7, 9, 11][playerCount];
  const mookFactor = [0, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5][level];
  let eliteMookFactor: number | string = mookFactor * 1.5;
  if (eliteMookFactor !== toInteger(eliteMookFactor)) {
    const low = Math.floor(eliteMookFactor);
    const high = Math.ceil(eliteMookFactor);
    eliteMookFactor = `${low}-${high}`;
  }
  const parLevelBase = level < 5 ? level : level < 8 ? level + 1 : level + 2;
  const parLevel = battlecount === 4 ? parLevelBase : parLevelBase + 1;

  const { t } = useTranslation("calculator");

  return (
    <>
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
      <p>
        {t("budget")} <strong>{t("budgetresult", { count: meqBudget })}</strong>
      </p>

      <div className="overflow-auto w-min max-w-full border dark:border-stone-700 rounded shadow bg-white dark:bg-stone-700 border-stone-300 my-2">
        <table>
          <thead>
            <tr>
              <th>{t("monsterlevel")}</th>
              <th>{t("standard", { mooks: mookFactor })}</th>
              <th>{t("elite", { mooks: eliteMookFactor })}</th>
              <th>{t("large", { mooks: mookFactor * 2 })}</th>
              <th>{t("huge", { mooks: mookFactor * 3 })}</th>
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
        <em>{t("footnote1")}</em>
      </p>
      <p>
        <em>{t("footnote2")}</em>
      </p>
    </>
  );
}
