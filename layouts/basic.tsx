import MegaNav from "@/components/mega-nav";
import { Navigation } from "@/lib/navigation";
import clsx from "clsx";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";

export default function BasicLayout({
  children,
  navigation,
  className,
}: {
  children: React.ReactNode;
  navigation: Navigation;
  className?: string;
}) {
  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen-safe flex flex-col">
      <header className="z-[1] sticky top-0 shadow">
        <MegaNav navigation={navigation} />
      </header>
      <div className={clsx("flex flex-col flex-1 relative z-0", className)}>
        {children}
      </div>
      <footer>
        <div className="bg-stone-900 text-white">
          <div className="p-4 flex flex-col gap-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-6 w-6"
              viewBox="0 0 34 34"
            >
              <path
                fillRule="evenodd"
                d="M12.3 34 4.5 11.4 5 8.1 3.2 4.9 0 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L21 1.6h9.8L34 5l-3 6.5L23.5 34H12.3Z"
              />
            </svg>
            <div className="prose prose-sm prose-invert prose-p:my-0 prose-p:leading-tight text-xs text-align-last-center text-white/50 font-display font-medium">
              <p>{t("footer.not-affiliated")}</p>
              <p>
                <Trans
                  t={t}
                  i18nKey="footer.foss"
                  components={{
                    br: <br />,
                    github: (
                      <Link href="https://github.com/13vaults/13vaults.com" />
                    ),
                  }}
                />
              </p>
              <div className="flex gap-1 flex-1 justify-center">
                <p>
                  <Trans
                    t={t}
                    i18nKey="footer.mastodon-link"
                    components={{
                      mastodon: (
                        <a rel="me" href="https://dice.camp/@13vaults" />
                      ),
                    }}
                  />
                </p>
                <span>&middot;</span>
                <p>
                  <Trans
                    t={t}
                    i18nKey="footer.privacy-link"
                    components={{
                      privacy: <Link href="/privacy" />,
                    }}
                  />
                </p>
                <span>&middot;</span>
                <p>
                  <Trans
                    t={t}
                    i18nKey="footer.legal-link"
                    components={{
                      legal: <Link href="/legal" />,
                    }}
                  />
                </p>
                <span>&middot;</span>
                <p>
                  <Trans
                    t={t}
                    i18nKey="footer.license-link"
                    components={{
                      license: <Link href="/license" />,
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
