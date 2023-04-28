import BasicLayout from "@/layouts/basic";
import Link from "next/link";
import { buildNav, Navigation } from "@/lib/navigation";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import {
  allAncestries,
  allClassItems,
  allRulesDocuments,
} from "@/.contentlayer/generated";
import { useRouter } from "next/router";
import { defaultLocale } from "@/lib/locales";
import { getI18nProperties } from "@/lib/get-static";
import { useTranslation } from "next-i18next";
import { get } from "lodash";

interface NotFoundP {
  navigation: Navigation;
}

export default function NotFound({ navigation }: NotFoundP) {
  const router = useRouter();
  const { locale = defaultLocale } = router;
  const { t } = useTranslation("common");
  return (
    <BasicLayout navigation={navigation}>
      <div className="flex-1 grid place-content-center bg-black/90 text-center">
        <h1 className="text-red-600 text-4xl sm:text-6xl font-serif uppercase you-died-animation">
          {t("not-found.title-label")}
        </h1>
        <Link
          hrefLang={locale}
          href="/"
          locale={locale}
          className="text-red-500 font-serif font-medium you-died-animation-late"
        >
          {t("not-found.return-label")}
        </Link>
      </div>
    </BasicLayout>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<NotFoundP>> {
  return {
    props: {
      navigation: buildNav({
        locale: String(get(context, "locale")),
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
      ...(await getI18nProperties(context, ["common"])),
    },
  };
}
