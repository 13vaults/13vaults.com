import { entries, find, map, reduce } from "lodash-es";

// A very ugly brute-force, but meh
export function localeContentLayerList<
  T extends { slug: string; locale: string }
>(
  currentLocale: string,
  defaultLocale: string,
  items: (T & { slug: string; locale: string })[]
) {
  return map(
    entries(
      reduce(
        items,
        (
          accumulator: {
            [slug: string]: typeof items;
          },
          current
        ) => {
          return accumulator[current.slug]
            ? {
                ...accumulator,
                [current.slug]: [current, ...accumulator[current.slug]],
              }
            : { ...accumulator, [current.slug]: [current] };
        },
        {}
      )
    ),
    ([_slug, locales]) =>
      find(locales, ["locale", currentLocale]) ||
      find(locales, ["locale", defaultLocale])!
  );
}
