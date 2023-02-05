import BasicLayout from "@/layouts/basic";
import { map } from "lodash";
import Link from "next/link";
import clsx from "clsx";
import ExportedImage from "next-image-export-optimizer";
import heroImage from "@/public/images/camelot-spire-butteredbap.webp";

const bottomNavItems = [
  {
    title: "Compendium",
    classes:
      "bg-teal-400/25 hover:bg-teal-400/50 border-teal-400/25 hover:border-teal-400/50",
    large: true,
    body: "All the information you need to play 13th Age games. From combat rules, character creation, to monster stats—it's all here.",
    href: "/compendium/",
  },
  {
    title: "Encounter Builder",
    classes: "bg-red-400/25 cursor-not-allowed border-red-400/25",
    body: "Coming Soon!",
  },
  {
    title: "Guides",
    classes: "bg-blue-400/25 cursor-not-allowed border-blue-400/25",
    body: "Coming Soon!",
  },
];

export default function VaultsAppHome() {
  return (
    <BasicLayout>
      <section className="flex-1 relative min-h-[60vh] text-white grid place-content-center bg-cover bg-top">
        <div className="absolute inset-0 home-hero">
          <ExportedImage
            className="z-[-1] object-top object-cover h-full w-full home-hero bg-neutral-900"
            fill
            src={heroImage}
            alt="Dragon flying near a tower."
            placeholder="blur"
            unoptimized={process.env.NODE_ENV === "development"}
          />
        </div>
        <div className="flex flex-col gap-12 p-8 pb-14 z-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold block text-center text-amber-50">
            Discover the 13 Vaults
          </h1>
          <div className="prose prose-p:font-display prose-p:font-medium prose-invert prose-p:my-1 prose-p:text-justify prose-p:leading-tight prose-p:text-amber-50">
            <p>
              The 13 Vaults is an unofficial community-driven resource site for
              13th Age&mdash;a fun and exciting RPG that innovates on the
              classic d20 system. Inside you&lsquo;ll find many resources and
              tools for GMs and players alike, from class pages to the full SRD
              rules reference and much more.
            </p>
          </div>
          <div className="grid place-content-center">
            <Link
              className="flex gap-3 focus:bg-teal-500 hover:bg-teal-500 bg-teal-600 border border-teal-400/50 hover:border-teal-400 rounded pl-8 pr-12 py-3 shadow transition-colors font-display font-semibold items-center"
              href="/compendium/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-5 w-5"
                viewBox="0 0 34 34"
              >
                <path
                  fillRule="evenodd"
                  d="M12.3 34 4.5 11.4 5 8.1 3.2 4.9 0 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L21 1.6h9.8L34 5l-3 6.5L23.5 34H12.3Z"
                />
              </svg>
              <span>Enter the Vaults</span>
            </Link>
          </div>
        </div>
        <p className="absolute bottom-5 left-5 text-sm text-amber-700/50">
          <a href="https://www.deviantart.com/butteredbap/art/Camelot-spire-358955566">
            Camelot Spire by butteredbap
          </a>
        </p>
      </section>
      <section className="bg-[rgb(27,10,0)] text-white">
        <nav className="md:max-w-6xl mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1">
            {map(bottomNavItems, (item) => (
              <li
                key={item.title}
                className={clsx({
                  "md:col-span-2": item.large,
                  "md:col-span-1": !item.large,
                })}
              >
                {item.href ? (
                  <Link
                    className={clsx(
                      item.classes,
                      "grid place-content-center rounded-sm border h-40 text-center px-8 transition-colors"
                    )}
                    href={item.href}
                  >
                    <h2 className="text-3xl font-display-serif font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-sm leading-tight font-display text-justify text-align-last-center font-medium text-white/75">
                      {item.body}
                    </p>
                  </Link>
                ) : (
                  <div
                    className={clsx(
                      item.classes,
                      "grid place-content-center rounded-sm border h-40 text-center px-8 opacity-60 transition-colors"
                    )}
                  >
                    <h2 className="text-3xl font-display-serif font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-sm leading-tight font-display text-justify text-align-last-center font-medium text-white/75">
                      {item.body}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </BasicLayout>
  );
}
