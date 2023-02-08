import clsx from "clsx";
import { map } from "lodash";
import { Children, ReactNode } from "react";

function AbilityList({ children }: { children: ReactNode }) {
  return (
    <div
      role="list"
      className="my-4 list-none m-0 p-0 flex flex-col sm:grid sm:grid-cols-2 2xl:grid-cols-3 grid-rows-[masonry] gap-2"
    >
      {map(Children.toArray(children), (child, idx) => (
        <div role="listitem" key={idx}>
          {child}
        </div>
      ))}
    </div>
  );
}

function FeatList({ children }: { children: ReactNode }) {
  return (
    <ol role="list" className="flex flex-col rounded sm:shadow-sky-900">
      {children}
    </ol>
  );
}

interface FeatP {
  tier: "adventurer" | "champion" | "epic";
  children: ReactNode;
}

function Feat({ tier, children }: FeatP): JSX.Element {
  const tierLabels = {
    adventurer: "Adventurer Feat:",
    champion: "Champion Feat:",
    epic: "Epic Feat:",
  };
  return (
    <li className="my-0 odd:bg-sky-50/100 bg-sky-200/50 dark:odd:bg-sky-900/50 dark:bg-sky-800/50 border-t sm:border-r sm:border-l sm:last:border-b dark:border-sky-900/75 border-sky-300 p-2 sm:first:rounded-t sm:last:rounded-b">
      <div>
        <p className="font-bold">{tierLabels[tier]}</p>
        <div>{children}</div>
      </div>
    </li>
  );
}

interface CompendiumAbilityP {
  name: string;
  type?: string;
  children?: ReactNode;
  feats?: ReactNode;
  usage?: "at-will" | "daily" | "recharge" | "battle";
}

export default function CompendiumAbility({
  name,
  children,
  type,
  feats,
}: CompendiumAbilityP): JSX.Element {
  return (
    <figure
      role="figure"
      className="text-xs m-0 rounded shadow border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
    >
      <header className="not-prose p-2 gap-2 shadow-sm font-display font-medium text-sm sm:text-base bg-white dark:bg-stone-700 border-b dark:text-stone-200 dark:border-stone-900 border-stone-300 rounded-t flex justify-between">
        <h1 className="text-left">{name}</h1>
        <h2 className="text-right ordinal">{type}</h2>
      </header>
      <div className="rounded-b flex-col">
        {children ? (
          <div
            className="p-2 prose max-w-none prose-p:text-justify dark:prose-invert prose-headings:font-display
                     text-xs first:prose-p:mt-0 last:prose-p:mb-0 prose-hr:my-2 prose-p:my-2 prose-hr:border-stone-300 prose-hr:dark:border-stone-700"
          >
            {children}
          </div>
        ) : null}
        {feats ? (
          <div
            className={clsx("not-prose sm:rounded sm:px-2 sm:pb-2 mt-0", {
              "pt-0 sm:pt-2": !children,
            })}
          >
            <FeatList>{feats}</FeatList>
          </div>
        ) : null}
      </div>
    </figure>
  );
}

CompendiumAbility.FeatList = FeatList;
CompendiumAbility.Feat = Feat;
CompendiumAbility.AbilityList = AbilityList;
