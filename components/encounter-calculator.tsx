import { useState } from "react";
import Prose from "./prose";
import EncounterTable from "./encounter-table";
import Container from "./container";
import { useTranslation } from "next-i18next";

export default function EncounterCalculator() {
  const [state, setState] = useState(() => ({
    playerCount: 4,
    battleCount: 4,
    level: 1,
  }));

  const { t } = useTranslation("calculator");

  return (
    <div className="p-4 lg:p-8">
      <Container className="flex flex-col gap-8">
        <div className="p-4 bg-stone-50 dark:bg-stone-800 dark:text-stone-50 shadow rounded flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col flex-1">
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
                setState({
                  ...state,
                  playerCount: Number.parseInt(event.target.value),
                })
              }
            />
          </div>

          <div className="flex flex-col flex-1">
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
                setState({
                  ...state,
                  level: Number.parseInt(event.target.value),
                })
              }
            />
          </div>

          <div className="flex flex-col flex-1">
            <p>
              <label htmlFor="battle-count">
                {t("form-daily-battles-label", {
                  battles: state.battleCount,
                })}
              </label>
            </p>
            <input
              id="battle-count"
              type="range"
              min="3"
              max="4"
              value={state.battleCount}
              onChange={(event) =>
                setState({
                  ...state,
                  battleCount: Number.parseInt(event.target.value),
                })
              }
            />
          </div>
        </div>
        <Prose>
          <h1>{t("title")}</h1>

          <EncounterTable
            playerCount={state.playerCount}
            battleCount={state.battleCount}
            level={state.level}
          />
        </Prose>
      </Container>
    </div>
  );
}
