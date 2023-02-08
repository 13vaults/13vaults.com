import { ReactNode } from "react";

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
  children: ReactNode;
  feats?: ReactNode;
  usage?: "at-will" | "daily" | "recharge" | "battle";
}

export function CompendiumAbilityList(): JSX.Element | null {
  return null;
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
      className="text-xs rounded shadow border border-stone-300 dark:border-stone-700"
    >
      <header className="not-prose p-2 gap-2 shadow-sm font-display font-medium text-sm sm:text-base bg-white dark:bg-stone-700 border-b dark:text-stone-200 dark:border-stone-900 border-stone-300 rounded-t flex justify-between">
        <h1 className="text-left">{name}</h1>
        <h2 className="text-right ordinal">{type}</h2>
      </header>
      <div className="bg-stone-50 dark:bg-stone-800 rounded-b">
        <div
          className="p-2 prose max-w-none prose-p:text-justify dark:prose-invert prose-headings:font-display
                        text-xs first:prose-p:mt-0 last:prose-p:mb-0 prose-hr:my-2 prose-p:my-2 prose-hr:border-stone-300 prose-hr:dark:border-stone-700"
        >
          {children}
        </div>
        {feats ? (
          <div className="not-prose sm:rounded sm:px-2 sm:pb-2 mt-0">
            <FeatList>{feats}</FeatList>
          </div>
        ) : null}
      </div>
    </figure>
  );
}

CompendiumAbility.FeatList = FeatList;
CompendiumAbility.Feat = Feat;
