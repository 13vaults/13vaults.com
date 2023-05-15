import { Ability, Feat } from "@/.contentlayer/generated";
import clsx from "clsx";
import { map } from "lodash-es";
import Link from "next/link";
import { ReactNode } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import Label from "./label";
import { useTranslation } from "next-i18next";

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
}

export default function AbilityItem({
  type,
  name,
  description,
  feats,
  usage,
}: AbilityItemP): JSX.Element {
  const headerBgMap: Record<NonNullable<Ability["usage"]>, string> = {
    "at-will":
      "from-emerald-600 to-emerald-800 dark:from-emerald-700 dark:to-emerald-900",
    other:
      "from-violet-800 to-violet-950 dark:from-violet-800 dark:to-violet-950",
    "per-battle": "from-red-600 to-red-800 dark:from-red-800 dark:to-red-950",
    "per-day":
      "from-stone-700 to-stone-800 dark:from-stone-800 dark:to-stone-950",
    recharge: "from-sky-600 to-sky-800 dark:from-sky-700 dark:to-sky-900",
  };

  return (
    <section className="text-base m-0 text-stone-950 dark:text-stone-50">
      <header
        className={clsx(
          "text-lg not-prose p-1 gap-2 font-serif font-medium bg-gradient-to-r text-stone-50 flex justify-between items-center",
          headerBgMap[usage]
        )}
      >
        <Label as="h1" variant="title-small" className="text-left">
          {name}
        </Label>
        <Label as="h1" variant="title-small" className="text-right ordinal">
          {type}
        </Label>
      </header>
      <div className="flex-col gap-2">
        {description ? (
          <div
            className="py-2 px-1 bg-white dark:bg-stone-900 prose max-w-none dark:prose-invert prose-h3:my-2 prose-headings:font-serif text-stone-950 dark:text-stone-50
                       text-base prose-p:text-current first:prose-p:mt-0 last:prose-p:mb-0 prose-hr:my-2 prose-p:my-2 prose-hr:border-stone-300 prose-hr:dark:border-stone-700"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              skipHtml
              components={{
                a: ({ href, ...properties }) => (
                  <Link href={href as string} {...properties} />
                ),
                table: ({ ...properties }: any) => (
                  <div className="overflow-auto border dark:border-stone-700 rounded shadow bg-white dark:bg-stone-700 border-stone-300 my-2">
                    <table {...properties} />
                  </div>
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </div>
        ) : null}
        {feats ? (
          <div className={clsx("not-prose mt-0")}>
            <FeatList>
              {map(feats, (feat, index) => (
                <FeatItem key={index} tier={feat.tier}>
                  <ReactMarkdown>{feat.description}</ReactMarkdown>
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
    <ul role="list" className="flex flex-col gap-1 bg-white dark:bg-stone-900">
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
    <li className="my-0 border-l-2 px-2 py-0 text-stone-900 dark:text-stone-50 border-sky-500 dark:border-sky-300 from-sky-200/50 dark:from-sky-950 to-sky-50/0 dark:to-sky-950/0 bg-gradient-to-r">
      <div>
        <Label variant="label">{t(`ability.feat.tier.${tier}`)}</Label>
        <div>{children}</div>
      </div>
    </li>
  );
}
