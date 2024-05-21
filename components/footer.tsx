import Link from "next/link";
import VaultsLogo from "./vaults-logo";
import { Trans, useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { map } from "lodash-es";
import Label from "./label";

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
        {
          name: t("nav.buy-13th-age-label"),
          href: "https://pelgranepress.com/product-category/d20-games/archmage-engine/13th-age/",
        },
      ],
      vaults: [
        { name: t("nav.13vaults.contact"), href: "mailto:admin@13vaults.com" },
      ],
      legal: [
        { name: t("nav.legal.legal"), href: "/legal" },
        { name: t("nav.legal.privacy"), href: "/privacy" },
        { name: t("nav.legal.license"), href: "/license" },
      ],
      social: [
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
      className="bg-stone-950 px-4 lg:px-8 pb-8 pt-8 sm:pt-24 lg:pt-32 text-stone-50"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {t("footer")}
      </h2>
      <div className="mx-auto max-w-7xl">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <VaultsLogo variant="full" className="h-7 text-white" />
            <Label variant="body-small" className="leading-6 text-stone-300">
              {t("footer.not-affiliated")}
            </Label>
            <Label variant="body-small" className="leading-6 text-stone-300">
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
            </Label>
            <div className="flex space-x-6">
              {map(navigation.social, (item) => (
                <Link
                  key={item.href}
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
                <Label
                  as="h3"
                  variant="label-small"
                  className="leading-6 text-stone-100"
                >
                  {t("nav.compendium-label")}
                </Label>
                <ul role="list" className="mt-6 space-y-4">
                  {map(navigation.compendium, (item) => (
                    <li key={item.name}>
                      <Label
                        variant="body-small"
                        as={Link}
                        href={item.href}
                        className="text-stone-300 hover:text-stone-100"
                      >
                        {item.name}
                      </Label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <Label
                  as="h3"
                  variant="label-small"
                  className="leading-6 text-stone-100"
                >
                  {t("nav.13vaults")}
                </Label>
                <ul role="list" className="mt-6 space-y-4">
                  {map(navigation.vaults, (item) => (
                    <li key={item.name}>
                      <Label
                        variant="body-small"
                        as={Link}
                        href={item.href}
                        className="text-stone-300 hover:text-stone-100"
                      >
                        {item.name}
                      </Label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <Label
                  as="h3"
                  variant="label-small"
                  className="leading-6 text-stone-100"
                >
                  {t("nav.resources")}
                </Label>
                <ul role="list" className="mt-6 space-y-4">
                  {map(navigation.resources, (item) => (
                    <li key={item.name}>
                      <Label
                        variant="body-small"
                        as={Link}
                        href={item.href}
                        className="text-stone-300 hover:text-stone-100"
                      >
                        {item.name}
                      </Label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <Label
                  as="h3"
                  variant="label-small"
                  className="leading-6 text-stone-100"
                >
                  {t("nav.legal")}
                </Label>
                <ul role="list" className="mt-6 space-y-4">
                  {map(navigation.legal, (item) => (
                    <li key={item.name}>
                      <Label
                        variant="body-small"
                        as={Link}
                        href={item.href}
                        className="text-stone-300 hover:text-stone-100"
                      >
                        {item.name}
                      </Label>
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
