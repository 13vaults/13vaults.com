import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nextConfig from "../next-i18next.config";

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export async function getI18nProperties(
  context: GetStaticPropsContext,
  ns = ["common"]
) {
  const locale = String(context?.params?.locale);
  const properties = {
    ...(await serverSideTranslations(locale, ns)),
  };
  return properties;
}

export function makeStaticProperties(ns = []) {
  return async function getStaticProps(context: GetStaticPropsContext) {
    return {
      props: await getI18nProperties(context, ns),
    };
  };
}
