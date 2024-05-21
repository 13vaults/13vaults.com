import { useTranslation } from "react-i18next";
import CompendiumTitle from "./compendium-title";
import Alert from "./alert";

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
      <div className="mt-4">
        <Alert variant="caution" showIcon={false}>
          {t("compendium.edition-warning")}
        </Alert>
      </div>
    </header>
  );
}
