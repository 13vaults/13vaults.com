import { defaultLocale } from "@/lib/locales";
import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps } from "react";

export default function ContentLink({
  href,
  ...properties
}: ComponentProps<typeof Link>) {
  const router = useRouter();
  const { locale = defaultLocale } = router.query;
  const localeString = String(locale);
  const newHref = href.toString()[0] === "/" ? `/${localeString}${href}` : href;
  return <Link href={newHref} {...properties} />;
}
