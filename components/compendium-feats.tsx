import clsx from "clsx";
import { map } from "lodash";

interface CompendiumFeat {
  tier: "adventurer" | "champion" | "epic";
  text: React.ReactNode;
}

interface CompendiumFeatsP {
  feats: CompendiumFeat[];
  noMargin?: boolean;
  className?: string;
}

export default function CompendiumFeats({
  feats,
  noMargin = true,
  className,
}: CompendiumFeatsP): JSX.Element {
  const makeLabel = (feat: CompendiumFeat) => {
    if (feat.tier === "adventurer") return "Adventurer Feat";
    if (feat.tier === "champion") return "Champion Feat";
    if (feat.tier === "epic") return "Epic Feat";
  };
  return (
    <div className={clsx(className, "not-prose", { "my-5": !noMargin })}>
      <ol className="flex flex-col gap-2">
        {map(feats, (feat, i) => (
          <li key={i}>
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-500/0">
              <p className="p-1 whitespace-pre-wrap">
                <span className="inline-block font-bold italic">
                  {makeLabel(feat)}:
                </span>{" "}
                <span className="inline-block">{feat.text}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
