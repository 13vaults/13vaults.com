import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import Head from "next/head";
import Link from "next/link";
import { buildNav, Navigation } from "@/lib/navigation";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import {
  allAncestries,
  allClassItems,
  allRulesDocuments,
} from "@/.contentlayer/generated";
import { get, map } from "lodash";
import { defaultLocale, supportedLocales } from "@/lib/locales";
import { getI18nProperties } from "@/lib/get-static";
import { useTranslation } from "next-i18next";
import CompendiumContentSection from "@/components/compendium-content-section";
import { useRouter } from "next/router";

interface CompendiumCategoryPageP {
  navigation: Navigation;
}

export default function CompendiumCategoryPage({
  navigation,
}: CompendiumCategoryPageP) {
  const router = useRouter();
  const { locale = defaultLocale } = router.query;
  const localeString = String(locale);
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>Compendium - 13 Vaults</title>
        <meta
          name="description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta property="og:locale" content={localeString} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Compendium - 13 Vaults" />
        <meta
          name="twitter:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta
          name="twitter:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Compendium - 13 Vaults" />
        <meta
          property="og:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta property="og:url" content="https://www.13vaults.com/" />
        <meta
          property="og:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
      </Head>
      <CompendiumCategoryIndexLayout navigation={navigation}>
        {map(navigation.main, (mainNavItem) => (
          <div
            key={mainNavItem.labelKey}
            className="flex flex-col gap-4 text-stone-900"
          >
            {map(mainNavItem.subnavs, (subnav) => (
              <CompendiumContentSection
                key={subnav.href}
                header={<Link href={subnav.href}>{t(subnav.labelKey)}</Link>}
              >
                <div className="grid grid-cols-2 gap-2">
                  {map(subnav.items ?? [], (item) => (
                    <div key={item.href} className="font-medium">
                      <Link href={item.href}>{item.name}</Link>
                    </div>
                  ))}
                </div>
              </CompendiumContentSection>
            ))}
          </div>
        ))}
      </CompendiumCategoryIndexLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: map(supportedLocales, (locale) => `/${locale}/compendium/`),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<CompendiumCategoryPageP>> {
  return {
    props: {
      navigation: buildNav({
        locale: String(get(context, "params.locale")),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common"])),
    },
  };
}
