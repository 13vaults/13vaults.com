import { Trans, useTranslation } from "next-i18next";
import Label from "./label";
import { useRouter } from "next/router";
import { defaultLocale } from "@/lib/locales";
import { useCallback, useMemo } from "react";
import { map, size } from "lodash-es";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";

type Effect = {
  name: string;
  text: string;
  attacks?: Attack[];
};

type Attack = {
  trigger?: string;
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
    | "triple-strength"
    | "quadruple-strength";
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
  initiative: string[];
  attacks?: Attack[];
  specials?: Effect[];
  nastierSpecials?: Effect[];
  ac: number;
  pd: number;
  md: number;
  hp: number;
  vulnerabilities?: string[];
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
  hp,
  ac,
  pd,
  md,
  nastierSpecials,
  vulnerabilities,
}: AdversaryStatBlockP) {
  const { t } = useTranslation("common");
  const { locale = defaultLocale } = useRouter();

  const vulnerabilitiesListFormatter = useMemo(
    () =>
      new Intl.ListFormat(locale, {
        style: "short",
        type: "unit",
      }),
    [locale]
  );

  const initiativeListFormatter = useMemo(
    () =>
      new Intl.ListFormat(locale, {
        style: "short",
        type: "unit",
      }),
    [locale]
  );

  const vulnerabilitiesList = useMemo(
    () => vulnerabilitiesListFormatter.format(vulnerabilities || ""),
    [vulnerabilitiesListFormatter, vulnerabilities]
  );

  const initiativeList = useMemo(
    () => initiativeListFormatter.format(initiative || ""),
    [initiativeListFormatter, initiative]
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

  return (
    <section className="bg-khaki-50 dark:bg-stone-800 text-stone-900 dark:text-stone-50 print:bg-white  not-prose border-b-2 border-black/25 dark:border-white/10">
      <header className="px-2 py-1 bg-teal-900 dark:bg-teal-950 bg-gradient-to-l from-teal-700 to-teal-700/0 dark:from-teal-900 dark:to-teal-900/0 text-stone-50 flex flex-col print:bg-white print:text-black print:from-transparent print:to-transparent text-shadow">
        <Label as="h1" variant="title-small">
          {name}
        </Label>
        <Label variant="label">{adversaryTitle}</Label>
      </header>
      <div className="flex flex-col gap-1 pb-1">
        <section>
          {flavorText ? (
            <Label className="block px-2 pt-1">
              <em>{flavorText}</em>
            </Label>
          ) : null}
        </section>
        <section className="px-2 py-0 bg-black/5 dark:bg-white/5 print:bg-white">
          <div>
            <Label>
              {t("adversary-block.initiative", { initiatives: initiativeList })}
            </Label>
          </div>
          {vulnerabilities && size(vulnerabilities) > 0 ? (
            <div>
              <Label>
                {t("adversary-block.vulnerabilities", {
                  vulnerabilities: vulnerabilitiesList,
                })}
              </Label>
            </div>
          ) : null}
          <div className="flex gap-1 items-center">
            <Label as="section" aria-label={t("adversary-block.hp-label")}>
              <Trans
                t={t}
                i18nKey="adversary-block.hp"
                values={{ hp }}
                components={{ strong: <strong /> }}
              />
            </Label>
            <Label as="section" aria-label={t("adversary-block.ac-label")}>
              <Trans
                t={t}
                i18nKey="adversary-block.ac"
                values={{ ac }}
                components={{ strong: <strong /> }}
              />
            </Label>
            <Label as="section" aria-label={t("adversary-block.pd-label")}>
              <Trans
                t={t}
                i18nKey="adversary-block.pd"
                values={{ pd }}
                components={{ strong: <strong /> }}
              />
            </Label>
            <Label as="section" aria-label={t("adversary-block.md-label")}>
              <Trans
                t={t}
                i18nKey="adversary-block.md"
                values={{ md }}
                components={{ strong: <strong /> }}
              />
            </Label>
          </div>
        </section>
        {attacks && size(attacks) > 0 ? (
          <section className="px-2">
            <ul
              aria-label={t("adversary-block.attack-list-label") as string}
              className="flex flex-col gap-1"
            >
              {map(attacks, (attack) => (
                <li key={attack.name}>
                  <AttackBlock {...attack} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {specials && size(specials) > 0 ? (
          <section
            className={clsx("px-2", {
              "bg-black/5 dark:bg-white/5 print:bg-white py-1":
                nastierSpecials && size(nastierSpecials) > 0,
            })}
          >
            <ul
              aria-label={t("adversary-block.specials-list") as string}
              className="-indent-4 ms-4"
            >
              {map(specials, (effect) => (
                <li key={effect.name}>
                  <SpecialAbility {...effect} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {nastierSpecials && size(nastierSpecials) > 0 ? (
          <section
            className={clsx("px-2", {
              "bg-black/5 dark:bg-white/5 print:bg-white py-1":
                !specials || size(specials) === 0,
            })}
          >
            <Label variant="label">
              {t("adversary-block.nastier-specials-list")}
            </Label>
            <ul
              aria-label={t("adversary-block.nastier-specials-list") as string}
              className="-indent-4 ms-4"
            >
              {map(nastierSpecials, (effect) => (
                <li key={effect.name}>
                  <SpecialAbility {...effect} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </section>
  );
}

function SpecialAbility({ name, text, attacks }: Effect) {
  const { t } = useTranslation();
  return (
    <div className="-indent-4">
      <Label as="span" className="float-left rtl:float-right">
        <em>{t("adversary-block.special-ability.name", { name })}</em>
      </Label>
      <div className="indent-0">
        <ReactMarkdown
          components={{
            ul: ({ children }) => (
              <ul className="list-disc list-inside">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside">{children}</ol>
            ),
          }}
        >
          {"&nbsp;" + text}
        </ReactMarkdown>
        {attacks && size(attacks) > 0 ? (
          <ul
            aria-label={t("adversary-block.attack-list-label") as string}
            className="px-2 flex flex-col gap-1"
          >
            {map(attacks, (attack) => (
              <li key={attack.name}>
                <AttackBlock {...attack} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function AttackBlock(attack: Attack) {
  const { t } = useTranslation();
  const { locale = defaultLocale } = useRouter();
  const attackTargetListFormatter = useMemo(
    () =>
      new Intl.ListFormat(locale, {
        style: "short",
        type: "unit",
      }),
    [locale]
  );

  const attackName = useCallback(
    ({
      range = "melee",
      targets,
      targetDefense,
      name,
      attackModifier,
      trigger,
    }: Attack) => {
      if (targets) {
        const targetList = attackTargetListFormatter.format(targets);
        if (trigger) {
          return (
            <Trans
              t={t}
              i18nKey={`adversary-block.attack.title.${range}-with-targets-vs-${targetDefense}-triggered`}
              values={{
                name,
                attackModifier,
                trigger: trigger,
                targets: targetList,
              }}
              components={{
                attack: <Label as="span" variant="label-small" />,
                trigger: <Label as="span" className="italic" />,
              }}
            />
          );
        }
        return (
          <Trans
            t={t}
            i18nKey={`adversary-block.attack.title.${range}-with-targets-vs-${targetDefense}`}
            values={{ name, attackModifier, targets: targetList }}
            components={{
              attack: <Label as="span" variant="label-small" />,
            }}
          />
        );
      }
      if (trigger) {
        return (
          <Trans
            t={t}
            i18nKey={`adversary-block.attack.title.${range}-vs-${targetDefense}-triggered`}
            values={{
              name,
              attackModifier,
              trigger: trigger,
            }}
            components={{
              attack: <Label as="span" variant="label-small" />,
              trigger: <Label as="span" className="italic" />,
            }}
          />
        );
      }
      return (
        <Trans
          t={t}
          i18nKey={`adversary-block.attack.title.${range}-vs-${targetDefense}`}
          values={{
            name,
            attackModifier,
          }}
          components={{
            attack: <Label as="span" variant="label-small" />,
          }}
        />
      );
    },
    [t, attackTargetListFormatter]
  );

  return (
    <div>
      <div className="-indent-4 ms-4">
        <span>{attackName(attack)}</span>
        <span>&mdash;</span>
        <Label as="span">{attack.damageEffects}</Label>
      </div>
      <ul
        aria-label={
          t("adversary-block.attack.triggered-effects-list-label") as string
        }
        className="-indent-4 ms-8"
      >
        {attack.triggeredEffects
          ? map(attack.triggeredEffects, (effect) => (
              <li key={effect.name}>
                <SpecialAbility {...effect} />
              </li>
            ))
          : null}
        {attack.limitedUseDescription ? (
          <li>
            <div>
              <Label>
                <em>
                  {t("adversary-block.limited-use", {
                    description: attack.limitedUseDescription,
                  })}
                </em>
              </Label>
            </div>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
