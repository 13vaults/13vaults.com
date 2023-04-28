import clsx from "clsx";
import { map } from "lodash";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Container from "./container";

const bottomNavItems = [
  {
    title_label: "compendium",
    classes:
      "bg-teal-400/25 hover:bg-teal-400/50 border-teal-400/25 hover:border-teal-400/50",
    large: true,
    body_label: "compendium-body",
    href: "/compendium/",
  },
  {
    title_label: "guides",
    classes: "bg-blue-400/25 cursor-not-allowed border-blue-400/25",
    body_label: "guides-body",
  },
  {
    title_label: "encounter-builder",
    classes: "bg-red-400/25 cursor-not-allowed border-red-400/25",
    body_label: "encounter-builder-body",
  },
];

export default function HomeHeroNavSection() {
  const { t } = useTranslation("home");

  return (
    <section className="bg-stone-950 text-white">
      <Container>
        <nav>
          <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1">
            {map(bottomNavItems, (item) => (
              <li
                key={item.title_label}
                className={clsx({
                  "md:col-span-2": item.large,
                  "md:col-span-1": !item.large,
                })}
              >
                {item.href ? (
                  <Link
                    className={clsx(
                      item.classes,
                      "grid place-content-center border h-40 text-center px-4 lg:px-8 transition-colors"
                    )}
                    href={item.href}
                  >
                    <h2 className="text-3xl font-display-serif font-semibold">
                      {t(item.title_label)}
                    </h2>
                    <p className="leading-tight font-serif text-align-last-center font-medium text-white/75">
                      {t(item.body_label)}
                    </p>
                  </Link>
                ) : (
                  <div
                    className={clsx(
                      item.classes,
                      "grid place-content-center border h-40 text-center px-4 lg:px-8 opacity-30 transition-colors"
                    )}
                  >
                    <h2 className="text-3xl font-display-serif font-semibold">
                      {t(item.title_label)}
                    </h2>
                    <p className="leading-tight font-serif text-align-last-center font-medium text-white/75">
                      {t(item.body_label)}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
