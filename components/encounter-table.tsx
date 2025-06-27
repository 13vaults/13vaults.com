import { useTranslation } from "next-i18next";
import { CSSProperties } from "react";

interface EncounterTableP {
  battleLevel: number;
}
export default function EncounterTable({ battleLevel = 1 }: EncounterTableP) {
  const { t } = useTranslation("calculator");
  const tableStyle: CSSProperties = {
    textAlign: "center",
  };

  return (
    <>
      <div className="overflow-auto max-w-full border dark:border-stone-700 rounded shadow bg-white dark:bg-stone-700 border-stone-300 my-2">
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>{t("monsterlevel")}</th>
              <th>{t("standard", { mooks: 5 })}</th>
              <th>{t("elite", { mooks: "7-8" })}</th>
              <th>{t("large", { mooks: 10 })}</th>
              <th>{t("huge", { mooks: 15 })}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{battleLevel - 3}</td>
              <td>{battleLevel - 3 >= 0 ? "0.3" : "—"}</td>
              <td>{battleLevel - 3 >= 0 ? "0.5" : "—"}</td>
              <td>{battleLevel - 3 >= 0 ? "0.7" : "—"}</td>
              <td>{battleLevel - 3 >= 0 ? "1" : "—"}</td>
            </tr>
            <tr>
              <td>{battleLevel - 2}</td>
              <td>{battleLevel - 2 >= 0 ? "0.5" : "—"}</td>
              <td>{battleLevel - 2 >= 0 ? "0.7" : "—"}</td>
              <td>{battleLevel - 2 >= 0 ? "1" : "—"}</td>
              <td>{battleLevel - 2 >= 0 ? "1.5" : "—"}</td>
            </tr>
            <tr>
              <td>{battleLevel - 1}</td>
              <td>0.7</td>
              <td>1</td>
              <td>1.5</td>
              <td>2</td>
            </tr>
            <tr>
              <td>
                <strong>{battleLevel}</strong>
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
              <td>{battleLevel + 1}</td>
              <td>1.5</td>
              <td>2*</td>
              <td>3*</td>
              <td>4*</td>
            </tr>
            <tr>
              <td>{battleLevel + 2}</td>
              <td>2*</td>
              <td>3*</td>
              <td>4*</td>
              <td>6*</td>
            </tr>
            <tr>
              <td>{battleLevel + 3}</td>
              <td>3*</td>
              <td>4*</td>
              <td>6*</td>
              <td>8*</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <em>{t("footnote1")}</em>
      </p>
    </>
  );
}
