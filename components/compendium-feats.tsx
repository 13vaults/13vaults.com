import { map } from "lodash";

interface CompendiumFeat {
  tier: "adventure" | "champion" | "epic";
  text: React.ReactNode;
}

interface CompendiumFeatsP {
  feats: CompendiumFeat[];
  noMargin: boolean;
}

export default function CompendiumFeats({
  feats,
}: CompendiumFeatsP): JSX.Element {
  const makeLabel = (feat: CompendiumFeat) => {
    if (feat.tier === "adventure") return "Adventure Feat";
    if (feat.tier === "champion") return "Champion Feat";
    if (feat.tier === "epic") return "Epic Feat";
  };
  return (
    <div className="not-prose">
      <ol className="flex flex-col gap-2">
        {map(feats, (feat, i) => (
          <li key={i}>
            <div className="font-serif bg-gradient-to-r from-blue-500/25 to-blue-500/0">
              <div className="flex gap-2 p-1">
                <label className="flex-shrink-0 font-bold italic">
                  {makeLabel(feat)}:
                </label>
                <p className="text-left">{feat.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
