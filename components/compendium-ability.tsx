import { Ability } from "@/.contentlayer/generated";
import clsx from "clsx";
import { map, size } from "lodash-es";
import AbilityItem from "./ability-item";
import { useBookStore, isSourceEnabled, isVVEnabled } from "@/lib/books";

interface AbilityListP {
  abilities?: Ability[];
  columns?: 1 | 2 | 3;
}

export default function AbilityList({
  abilities,
  columns = 1,
}: AbilityListP): JSX.Element | null {
  if (size(abilities) === 0) return null;

  const columnClassesMap: Record<1 | 2 | 3, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
  };
  const bookstore = useBookStore( (state) => state);
  const isAbilityHidden = (ability) => {
    return (ability.source && !isSourceEnabled(bookstore,ability.source)) ||
    (ability.version && !isVVEnabled(bookstore,"version",ability.version)) ||
    (ability.variant && !isVVEnabled(bookstore,"variant",ability.version)) ||
    (ability.replaced_by && isSourceEnabled(bookstore,ability.replaced_by))
  };

  // so far this is the only sourcebook that uses spell schools/bloodlines
  const displaySchools = isSourceEnabled(bookstore,"DATP");

  return (
    <div
      role="list"
      className={clsx(
        "my-4 list-none m-0 p-0 grid grid-cols-1 gap-4 grid-rows-[masonry]",
        columnClassesMap[columns]
      )}
    >
      {map(abilities, (ability) => isAbilityHidden(ability) || (
        <div role="listitem" key={ability.name}>
          <AbilityItem
            type={ability.school && displaySchools ? 
              ability.school + " " + ability._type :
              ability._type}
            name={ability.name}
            description={ability.description}
            feats={ability.feats}
            usage={ability.usage}
            tier={ability.tier}
          />
        </div>
      ))}
    </div>
  );
}
