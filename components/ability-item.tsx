import { Ability, Feat } from "@/.contentlayer/generated";
import clsx from "clsx";
import { map } from "lodash-es";
import { ReactNode } from "react";
import Label from "./label";
import { useTranslation } from "next-i18next";
import { Markup } from "interweave";
import Link from "next/link";

type PartialFeat = {
  tier: Feat["tier"];
  description: Feat["description"];
};

interface AbilityItemP {
  type: Ability["_type"];
  name: Ability["name"];
  description: Ability["description"];
  feats: Ability["feats"] | PartialFeat[];
  usage: Ability["usage"];
  tier: Ability["tier"];
  source: Ability["source"];
}

export default function AbilityItem({
  type,
  name,
  description,
  feats,
  usage,
  tier
}: AbilityItemP): JSX.Element {
  const headerBgMap: Record<NonNullable<Ability["usage"]>, string> = {
    "at-will":
      "from-emerald-600 to-emerald-800 dark:from-emerald-700 dark:to-emerald-900",
    other:
      "from-violet-800 to-violet-950 dark:from-violet-800 dark:to-violet-950",
    "per-battle": "from-red-600 to-red-800 dark:from-red-800 dark:to-red-950",
    "per-day":
      "from-stone-500 to-stone-700 dark:from-stone-600 dark:to-stone-800",
    recharge: "from-sky-600 to-sky-800 dark:from-sky-700 dark:to-sky-900",
  };


  return (
    <section className={clsx(
       // TODO: figure out a nicer way of displaying this
       type && (type.startsWith("Domain Spell") || type.startsWith("Death Knight Rune") || type.startsWith("Bonus Power")) ? "pl-16": "",
      "text-base m-0 text-stone-950 dark:text-stone-50 relative"
    )}>
      <div className="absolute -inset-[2px] border-2 border-stone-100 dark:border-stone-950 pointer-events-none" />
      <header
        className={clsx(
          "text-lg not-prose p-1 gap-2 font-serif font-medium bg-gradient-to-l text-stone-50 flex justify-between items-center",
          headerBgMap[usage]
        )}
      >
        <Label as="h1" variant="title" className="text-left">
          {name}
        </Label>
        <Label variant="label" className="text-right ordinal">
          {type}
        </Label>
      </header>
      <div className="flex-col gap-2 bg-stone-50 dark:bg-stone-900 bg-gradient-to-t from-white to-white/0 dark:from-stone-800 dark:to-stone-800/0">
        {description ? (
          <div
            className="py-2 px-1 prose max-w-none dark:prose-invert prose-h3:my-2 prose-headings:font-serif text-stone-950 dark:text-stone-50
                       text-base prose-p:text-current first:prose-p:mt-0 last:prose-p:mb-0 prose-hr:my-2 prose-p:my-2 prose-hr:border-stone-300 prose-hr:dark:border-stone-700"
          >
            <Markup
              tagName="fragment"
              content={description.html}
              transform={(node: HTMLElement, children) => {
                if (node.tagName.toUpperCase() === "A") {
                  return (
                    <Link href={node.getAttribute("href") as string}>
                      {children}
                    </Link>
                  );
                }
                if (node.tagName.toUpperCase() === "TABLE") {
                  children = children.filter((node) => node !== "\n");
                  return (
                    <div className="overflow-auto w-min max-w-full bg-white dark:bg-stone-700 my-2">
                      <table {...node.attributes}>{children}</table>
                    </div>
                  );
                }
                if (node.tagName.toUpperCase() === "THEAD") {
                  children = children.filter((node) => node !== "\n");
                  return <thead {...node.attributes}>{children}</thead>;
                }
                if (node.tagName.toUpperCase() === "TR") {
                  children = children.filter((node) => node !== "\n");
                  return <tr {...node.attributes}>{children}</tr>;
                }
                if (node.tagName.toUpperCase() === "TBODY") {
                  children = children.filter((node) => node !== "\n");
                  return <tbody {...node.attributes}>{children}</tbody>;
                }
              }}
            />
          </div>
        ) : null}
        {feats ? (
          <div className={clsx("not-prose mt-0")}>
            <FeatList>
              {map(feats, (feat, index) => (
                <FeatItem key={index} tier={feat.tier}>
                  <Markup tagName="fragment" content={feat.description.html} />
                </FeatItem>
              ))}
            </FeatList>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FeatList({ children }: { children: ReactNode }) {
  return (
    <ul role="list" className="flex flex-col gap-1">
      {children}
    </ul>
  );
}

interface FeatItemP {
  tier: "adventurer" | "champion" | "epic";
  children: ReactNode;
}

function FeatItem({ tier, children }: FeatItemP): JSX.Element {
  const { t } = useTranslation();

  return (
    <li className="my-0 border-l-2 px-2 py-0 text-stone-900 dark:text-stone-50 border-sky-500 dark:border-sky-300 from-sky-200/50 dark:from-sky-950 to-sky-50/10 dark:to-sky-950/10 bg-gradient-to-r">
      <div>
        <Label variant="label">{t(`ability.feat.tier.${tier}`)}</Label>
        <div>{children}</div>
      </div>
    </li>
  );
}
