import {
  allAncestries,
  allClassItems,
  allRulesDocuments,
  Ancestry,
} from "contentlayer/generated";
import { get, map, pick } from "lodash";
import { GetStaticPathsContext, GetStaticPropsResult } from "next";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import Head from "next/head";
import { buildNav, Navigation } from "@/lib/navigation";
import { useRouter } from "next/router";
import { defaultLocale, supportedLocales } from "@/lib/locales";
import { getI18nProperties } from "@/lib/get-static";
import CompendiumContentHero from "@/components/compendium-content-hero";
import { Trans, useTranslation } from "next-i18next";
import { useMemo } from "react";
import { PickPartial } from "@/utils";
import CompendiumTitle from "@/components/compendium-title";
import { localeContentLayerList } from "@/lib/locale-utils";

type AncestryListing = PickPartial<
  Ancestry,
  "slug" | "name" | "abilities" | "ability_scores" | "page_dress" | "locale"
>;

interface AncestriesPageP {
  ancestries: AncestryListing[];
  navigation: Navigation;
}

export default function AncestriesPage({
  ancestries,
  navigation,
}: AncestriesPageP) {
  const router = useRouter();
  const { locale = defaultLocale } = router.query;
  const localeString = String(locale);
  const { t } = useTranslation("ancestries");
  const listFormatter = useMemo(
    () =>
      new Intl.ListFormat(localeString, {
        style: "short",
        type: "disjunction",
      }),
    [localeString]
  );
  const powerListFormatter = useMemo(
    () =>
      new Intl.ListFormat(localeString, {
        style: "narrow",
        type: "conjunction",
      }),
    [localeString]
  );

  return (
    <>
      <Head>
        <title>Races - 13 Vaults</title>
        <meta
          name="description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta property="og:locale" content={localeString} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Races - 13 Vaults" />
        <meta
          name="twitter:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta
          name="twitter:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Races - 13 Vaults" />
        <meta
          property="og:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta
          property="og:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
      </Head>
      <CompendiumCategoryIndexLayout navigation={navigation}>
        <CompendiumTitle className="mt-2 mb-6">{t("title")}</CompendiumTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {map(
            localeContentLayerList<AncestryListing>(
              localeString,
              defaultLocale,
              ancestries
            ),
            (ancestry) => (
              <CompendiumContentHero
                key={ancestry.slug}
                title={ancestry.name}
                description={
                  ancestry.page_dress?.lead ? (
                    <p className="text-sm">{ancestry.page_dress.lead}</p>
                  ) : null
                }
                detailsHref={`/${localeString}/compendium/races/${ancestry.slug}`}
                detailsLabel={t("ancestry-details-button-label", {
                  ancestry: ancestry.name,
                })}
              >
                <ul>
                  {ancestry.ability_scores ? (
                    <li>
                      <Trans
                        t={t}
                        i18nKey="ability-scores-label"
                        values={{
                          abilityScores: listFormatter.format(
                            map(
                              map(
                                ancestry.ability_scores,
                                (score) => score || ""
                              ),
                              (ability) => t(ability)
                            )
                          ),
                        }}
                        components={{ strong: <strong /> }}
                      />
                    </li>
                  ) : (
                    <li>
                      <Trans
                        t={t}
                        i18nKey="ability-scores-any-label"
                        components={{ strong: <strong /> }}
                      />
                    </li>
                  )}
                  <li>
                    <Trans
                      t={t}
                      i18nKey="powers-label"
                      values={{
                        powers: powerListFormatter.format(
                          map(
                            ancestry.abilities,
                            (ability) => ability?.name || ""
                          )
                        ),
                      }}
                      components={{ strong: <strong /> }}
                    />
                  </li>
                </ul>
              </CompendiumContentHero>
            )
          )}
        </div>
      </CompendiumCategoryIndexLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: map(supportedLocales, (locale) => `/${locale}/compendium/races/`),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPathsContext
): Promise<GetStaticPropsResult<AncestriesPageP>> {
  return {
    props: {
      ancestries: map(allAncestries, (ancestry) =>
        pick(ancestry, [
          "slug",
          "name",
          "ability_scores",
          "abilities",
          "page_dress",
          "locale",
        ])
      ),
      navigation: buildNav({
        locale: String(get(context, "params.locale", defaultLocale)),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["ancestries", "common"])),
    },
  };
}
