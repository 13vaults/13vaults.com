import { useTranslation } from "react-i18next";
import CompendiumTitle from "./compendium-title";

export default function VaultHeader({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: string;
  secondaryLabel: string;
}) {
  const { t } = useTranslation();

  return (
    <header className="not-prose">
      <CompendiumTitle>{primaryLabel}</CompendiumTitle>
      <p className="my-0 font-serif font-medium italic text-black/50 dark:text-stone-400">
        {secondaryLabel}
      </p>
      <div className="mt-4 bg-amber-100 dark:bg-amber-400/25 text-black dark:text-amber-100 rounded-sm py-1 px-2">
        <p>{t("compendium.edition-warning")}</p>
      </div>
    </header>
  );
}
