import MegaNav from "@/components/mega-nav";
import VaultsLogo from "@/components/vaults-logo";
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
      <header className="z-10 sticky top-0 shadow">
        <MegaNav navigation={navigation} />
      </header>
      <div className={clsx("flex flex-col flex-1 relative", className)}>
        {children}
      </div>
      <footer className="font-bold">
        <div className="bg-stone-950 text-white">
          <div className="p-4 flex flex-col gap-2 items-center justify-center">
            <VaultsLogo className="h-6 w-6" variant="tiny" />
            <div className="prose prose-sm prose-invert prose-p:my-0 prose-p:leading-tight text-xs text-align-last-center text-white/50">
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
