import clsx from "clsx";
import { map } from "lodash-es";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Container from "./container";

const bottomNavItems = [
  {
    title_label: "character-creation",
    href: "/compendium/basic-rules/character-creation",
  },
  {
    title_label: "rules",
    href: "/compendium/basic-rules",
  },
  {
    title_label: "races",
    href: "/compendium/races",
  },
  {
    title_label: "classes",
    href: "/compendium/classes",
  },
];

export default function HomeHeroNavSection() {
  const { t } = useTranslation("home");

  return (
    <Container>
      <nav>
        <ul
          role="list"
          className="grid grid-cols-1 xl:grid-cols-4 gap-4 xl:px-24 text-white"
        >
          {map(bottomNavItems, (item) => (
            <li key={item.title_label}>
              <Link
                className={clsx(
                  "bg-black/25 rounded bg-gradient-to-t from-black/50 to-black/0 outline outline-1 outline-white/5 hover:outline-white/10 transition-colors hover:bg-black/75 focus:outline-white border-0 focus:border focus:border-black border-transparent",
                  "group grid place-content-center xl:h-96 h-24 text-center px-4 transition-colors"
                )}
                href={item.href}
              >
                <h2 className="text-3xl font-display-serif font-semibold group-hover:text-white group-focus:text-white text-stone-50/90 transition-colors">
                  {t(item.title_label)}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
