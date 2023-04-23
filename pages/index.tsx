import BasicLayout from "@/layouts/basic";
import { filter, get, map, orderBy, pick, slice } from "lodash";
import { buildNav, Navigation } from "@/lib/navigation";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import {
  BlogPost,
  allAncestries,
  allBlogPosts,
  allClassItems,
  allRulesDocuments,
} from "@/.contentlayer/generated";
import Head from "next/head";
import { defaultLocale } from "@/lib/locales";
import { useRouter } from "next/router";
import { getI18nProperties } from "@/lib/get-static";
import HomeNewsSection from "@/components/home-news-section";
import { PickPartial } from "@/utils";
import HomeHeroSection from "@/components/home-hero-section";
import HomeHeroNavSection from "@/components/home-hero-nav-section";

type BlogPostItem = PickPartial<
  BlogPost,
  "date" | "published" | "slug" | "excerpt" | "title"
>;

interface VaultsAppHomeP {
  navigation: Navigation;
  heroPost: BlogPostItem;
  extraPosts: BlogPostItem[];
}

export default function VaultsAppHome({
  navigation,
  heroPost,
  extraPosts,
}: VaultsAppHomeP) {
  const router = useRouter();
  const { locale = defaultLocale } = router;
  return (
    <>
      <Head>
        <title>
          13 Vaults - An unofficial reference site and toolkit for 13th Age
          roleplaying game (RPG) players and game masters (GMs).
        </title>
        <title>13 Vaults</title>
        <meta
          name="description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta property="og:locale" content={locale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="13 Vaults" />
        <meta
          name="twitter:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta
          name="twitter:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="13 Vaults" />
        <meta
          property="og:description"
          content="13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
        />
        <meta
          property="og:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
      </Head>
      <BasicLayout navigation={navigation}>
        <HomeHeroSection />
        <HomeHeroNavSection />
        <HomeNewsSection heroPost={heroPost} extraPosts={extraPosts} />
      </BasicLayout>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<VaultsAppHomeP>> {
  const sortedBlogPosts = orderBy(
    map(
      process.env.NODE_ENV === "production"
        ? filter(allBlogPosts, ["published", true])
        : allBlogPosts,
      (post) => pick(post, ["title", "date", "excerpt", "slug", "published"])
    ),
    "date",
    "desc"
  );

  return {
    props: {
      heroPost: get(sortedBlogPosts, "0"),
      extraPosts: slice(sortedBlogPosts, 1, 5),
      navigation: buildNav({
        locale: get(context, "locale"),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["home", "common"])),
    },
  };
}
