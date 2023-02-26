import CompendiumTitle from "./compendium-title";

export default function VaultHeader({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <header className="not-prose">
      <CompendiumTitle>{primaryLabel}</CompendiumTitle>
      <p className="my-0 font-display font-medium italic text-black/50 dark:text-stone-400">
        {secondaryLabel}
      </p>
    </header>
  );
}
