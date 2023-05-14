import { Trans, useTranslation } from "next-i18next";
import Label from "./label";
import { useRouter } from "next/router";
import { defaultLocale } from "@/lib/locales";
import { useCallback, useMemo } from "react";
import { map, size } from "lodash";

type Effect = {
  name: string;
  text: string;
};

type Attack = {
  speciallyTriggered?: boolean;
  range?: "melee" | "close-quarters" | "ranged";
  name: string;
  attackModifier: number;
  triggeredEffects?: Effect[];
  targetDefense: "AC" | "PD" | "MD";
  targets?: string[];
  limitedUseDescription?: string;
  damageEffects: string;
};

interface AdversaryStatBlockP {
  name: string;
  strengthModifier?: "elite" | "weakling";
  sizeOrStrength?:
    | "normal"
    | "large"
    | "double-strength"
    | "huge"
    | "triple-strength";
  level: number;
  flavorText?: string;
  role:
    | "mook"
    | "troop"
    | "wrecker"
    | "blocker"
    | "caster"
    | "spoiler"
    | "archer"
    | "leader";
  type: string;
  initiative: number;
  attacks?: Attack[];
  specials?: Effect[];
  nastierSpecials?: Effect[];
}

export default function AdversaryStatBlock({
  name,
  initiative,
  sizeOrStrength = "normal",
  strengthModifier,
  type,
  role,
  level,
  attacks,
  specials,
  flavorText,
}: AdversaryStatBlockP) {
  const { t } = useTranslation("common");
  const { locale = defaultLocale } = useRouter();
  const attackTargetListFormatter = useMemo(
    () =>
      new Intl.ListFormat(locale, {
        style: "short",
        type: "unit",
      }),
    [locale]
  );

  const adversaryTitle = useMemo(() => {
    if (strengthModifier && sizeOrStrength === "normal") {
      return (
        <Trans
          t={t}
          i18nKey="adversary-block.normal-modified-size-strength-level-role-type"
          values={{
            count: level,
            role: t(`adversary-block.role.${role}`),
            type,
            ordinal: true,
            modifier: t(`adversary-block.modifier.${strengthModifier}`),
          }}
          components={{ em: <em /> }}
        />
      );
    }
    if (strengthModifier && sizeOrStrength !== "normal") {
      return (
        <Trans
          t={t}
          i18nKey="adversary-block.non-normal-modified-size-strength-level-role-type"
          values={{
            sizeOrStrength: t(
              `adversary-block.size-strength.${sizeOrStrength}`
            ),
            count: level,
            role: t(`adversary-block.role.${role}`),
            modifier: t(`adversary-block.modifier.${strengthModifier}`),
            type,
            ordinal: true,
          }}
          components={{ em: <em /> }}
        />
      );
    }
    if (sizeOrStrength !== "normal") {
      return (
        <Trans
          t={t}
          i18nKey="adversary-block.non-normal-size-strength-level-role-type"
          values={{
            sizeOrStrength: t(
              `adversary-block.size-strength.${sizeOrStrength}`
            ),
            count: level,
            role: t(`adversary-block.role.${role}`),
            type,
            ordinal: true,
          }}
          components={{ em: <em /> }}
        />
      );
    }
    return (
      <Trans
        t={t}
        i18nKey="adversary-block.normal-size-strength-level-role-type"
        values={{
          count: level,
          role: t(`adversary-block.role.${role}`),
          type,
          ordinal: true,
        }}
        components={{ em: <em /> }}
      />
    );
  }, [level, role, strengthModifier, type, sizeOrStrength, t]);

  const attackName = useCallback(
    ({
      range = "melee",
      targets,
      targetDefense,
      name,
      attackModifier,
    }: Attack) => {
      if (targets) {
        const targetList = attackTargetListFormatter.format(targets);
        return t(
          `adversary-block.attack.title.${range}-with-targets-vs-${targetDefense}`,
          { name, attackModifier, targets: targetList }
        );
      }
      return t(`adversary-block.attack.title.${range}-vs-${targetDefense}`, {
        name,
        attackModifier,
      });
    },
    [t, attackTargetListFormatter]
  );

  return (
    <section className="bg-white dark:bg-stone-900 p-2 border-y-2 border-teal-500 dark:border-teal-600">
      <Label as="h1" variant="title-small">
        {name}
      </Label>
      {flavorText ? (
        <Label className="my-2">
          <em>{flavorText}</em>
        </Label>
      ) : null}
      <Label variant="label-small">{adversaryTitle}</Label>
      <Label>{t("adversary-block.initiative", { initiative })}</Label>
      {attacks && size(attacks) > 0 ? (
        <ol
          aria-label={t("adversary-block.attack-list-label") as string}
          className="py-2 flex flex-col gap-2"
        >
          {map(attacks, (attack) => (
            <li key={attack.name}>
              <div>
                {attack.limitedUseDescription ? (
                  <Label>
                    <em>
                      {t("adversary-block.limited-use", {
                        description: attack.limitedUseDescription,
                      })}
                    </em>
                  </Label>
                ) : null}
                <div className="-indent-4 ms-4">
                  <Label as="span" variant="label-small">
                    {attackName(attack)}
                  </Label>
                  &nbsp;
                  <Label as="span">{attack.damageEffects}</Label>
                </div>
                {attack.triggeredEffects ? (
                  <ol
                    aria-label={
                      t(
                        "adversary-block.attack.triggered-effects-list-label"
                      ) as string
                    }
                    className="-indent-4 ms-8"
                  >
                    {map(attack.triggeredEffects, (effect) => (
                      <li key={effect.name}>
                        <div>
                          <Label>
                            <Trans
                              t={t}
                              i18nKey="adversary-block.attack.effect"
                              values={{
                                name: effect.name,
                                description: effect.text,
                              }}
                              components={{ em: <em /> }}
                            />
                          </Label>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      ) : null}
      {specials && size(specials) > 0 ? (
        <ol
          aria-label={t("adversary-block.specials-list") as string}
          className="-indent-4 ms-4"
        >
          {map(specials, ({ name, text }) => (
            <li key={name}>
              <div>
                <Label>
                  <Trans
                    t={t}
                    i18nKey="adversary-block.special-ability"
                    values={{ name, description: text }}
                    components={{ em: <em /> }}
                  />
                </Label>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
