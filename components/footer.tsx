import Link from "next/link";
import VaultsLogo from "./vaults-logo";
import { Trans, useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { map } from "lodash";

export default function Footer() {
  const { t } = useTranslation("common");

  const navigation = useMemo(
    () => ({
      compendium: [
        {
          name: t("nav.compendium-label"),
          href: "/compendium",
        },
        {
          name: t("nav.compendium-classes-label"),
          href: "/compendium/classes",
        },
        {
          name: t("nav.compendium-basic-rules-label"),
          href: "/compendium/basic-rules",
        },
        {
          name: t("nav.compendium-ancestries-label"),
          href: "/compendium/races",
        },
      ],
      resources: [
        { name: t("nav.resources.battle-calculator"), href: "/calculator" },
      ],
      vaults: [
        { name: t("nav.13vaults.blog"), href: "/blog" },
        { name: t("nav.13vaults.contact"), href: "mailto:admin@13vaults.com" },
      ],
      legal: [
        { name: t("nav.legal.legal"), href: "/legal" },
        { name: t("nav.legal.privacy"), href: "/privacy" },
        { name: t("nav.legal.license"), href: "/license" },
      ],
      social: [
        {
          name: t("social.mastodon"),
          anchorProps: {
            rel: "me",
          },
          href: "https://dice.camp/@13vaults",
          icon: (props: React.HTMLAttributes<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
              <path d="M20.94 14c-.28 1.41-2.44 2.96-4.97 3.26-1.31.15-2.6.3-3.97.24-2.25-.11-4-.54-4-.54v.62c.32 2.22 2.22 2.35 4.03 2.42 1.82.05 3.44-.46 3.44-.46l.08 1.65s-1.28.68-3.55.81c-1.25.07-2.81-.03-4.62-.5-3.92-1.05-4.6-5.24-4.7-9.5l-.01-3.43c0-4.34 2.83-5.61 2.83-5.61C6.95 2.3 9.41 2 11.97 2h.06c2.56 0 5.02.3 6.47.96 0 0 2.83 1.27 2.83 5.61 0 0 .04 3.21-.39 5.43M18 8.91c0-1.08-.3-1.91-.85-2.56-.56-.63-1.3-.96-2.23-.96-1.06 0-1.87.41-2.42 1.23l-.5.88-.5-.88c-.56-.82-1.36-1.23-2.43-1.23-.92 0-1.66.33-2.23.96C6.29 7 6 7.83 6 8.91v5.26h2.1V9.06c0-1.06.45-1.62 1.36-1.62 1 0 1.5.65 1.5 1.93v2.79h2.07V9.37c0-1.28.5-1.93 1.51-1.93.9 0 1.35.56 1.35 1.62v5.11H18V8.91z"></path>
            </svg>
          ),
        },
        {
          name: t("social.github"),
          href: "https://github.com/13vaults",
          icon: (props: React.HTMLAttributes<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
              <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
            </svg>
          ),
        },
        {
          name: t("social.discord"),
          href: "https://discord.gg/m9DbPC6RsC",
          icon: (props: React.HTMLAttributes<SVGSVGElement>) => (
            <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
              <path d="M20.32 4.37a19.8 19.8 0 00-4.89-1.51.07.07 0 00-.08.03c-.2.38-.44.87-.6 1.25a18.27 18.27 0 00-5.5 0 12.64 12.64 0 00-.6-1.25.08.08 0 00-.09-.03 19.74 19.74 0 00-4.88 1.51.07.07 0 00-.04.03A20.25 20.25 0 00.1 18.06a.08.08 0 00.03.05 19.9 19.9 0 006 3.03.08.08 0 00.08-.02 14.09 14.09 0 001.22-2 .08.08 0 00-.04-.1 13.1 13.1 0 01-1.87-.9.08.08 0 010-.12 10.2 10.2 0 00.36-.3.07.07 0 01.08 0 14.2 14.2 0 0012.06 0 .07.07 0 01.08 0l.37.3a.08.08 0 010 .12 12.3 12.3 0 01-1.87.9.08.08 0 00-.05.1c.36.7.78 1.36 1.23 2a.08.08 0 00.08.02 19.84 19.84 0 006-3.03.08.08 0 00.04-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 00-.03-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.94 2.42-2.15 2.42z"></path>
            </svg>
          ),
        },
        {
          name: t("social.email"),
          href: "mailto:admin@13vaults.com",
          icon: (props: React.HtmlHTMLAttributes<SVGSVGElement>) => (
            <EnvelopeIcon {...props} />
          ),
        },
      ],
    }),
    [t]
  );

  return (
    <footer
      className="bg-stone-950 text-white px-4 lg:px-8 pb-8 pt-8 sm:pt-24 lg:pt-32 font-serif"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {t("footer")}
      </h2>
      <div className="mx-auto max-w-7xl">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <VaultsLogo variant="full" className="h-7 text-white" />
            <p className="text-sm leading-6 text-stone-300">
              {t("footer.not-affiliated")}
            </p>
            <p className="text-sm leading-6 text-stone-300">
              <Trans
                t={t}
                i18nKey="footer.foss"
                components={{
                  br: <br />,
                  github: (
                    <Link
                      className="text-stone-200 hover:text-white font-bold"
                      href="https://github.com/13vaults/13vaults.com"
                    />
                  ),
                }}
              />
            </p>
            <div className="flex space-x-6">
              {map(navigation.social, (item) => (
                <Link
                  key={item.href}
                  {...(item.anchorProps || {})}
                  href={item.href}
                  className="text-stone-400 hover:text-teal-400"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-stone-100">
                  {t("nav.compendium-label")}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {map(navigation.compendium, (item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-stone-300 hover:text-stone-100"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-stone-100">
                  {t("nav.13vaults")}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {map(navigation.vaults, (item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-stone-300 hover:text-stone-100"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-stone-100">
                  {t("nav.resources")}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {map(navigation.resources, (item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-stone-300 hover:text-stone-100"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-stone-100">
                  {t("nav.legal")}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {map(navigation.legal, (item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-stone-300 hover:text-stone-100"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
