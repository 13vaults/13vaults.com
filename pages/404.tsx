import BasicLayout from "@/layouts/basic";
import Link from "next/link";
import { buildNav, Navigation } from "@/lib/navigation";
import { GetStaticPropsResult } from "next";
import {
  allAncestries,
  allClassItems,
  allRulesDocuments,
} from "@/.contentlayer/generated";
import { useRouter } from "next/router";
import { defaultLocale } from "@/lib/locales";

interface NotFoundP {
  navigation: Navigation;
}

export default function NotFound({ navigation }: NotFoundP) {
  const router = useRouter();
  const { locale = defaultLocale } = router.query;
  const localeString = String(locale);
  return (
    <BasicLayout navigation={navigation}>
      <div className="flex-1 grid place-content-center bg-black/90 text-center">
        <h1 className="text-red-600 text-4xl sm:text-6xl font-serif uppercase you-died-animation">
          You Got Lost
        </h1>
        <Link
          hrefLang={localeString}
          href={`/${localeString}/`}
          className="text-red-500 font-display font-medium you-died-animation-late"
        >
          Return back to 13vaults
        </Link>
      </div>
    </BasicLayout>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<NotFoundP>
> {
  return {
    props: {
      navigation: buildNav({
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
    },
  };
}
