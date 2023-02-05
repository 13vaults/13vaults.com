export default function VaultHeader({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <header className="not-prose">
      <h1 className="my-0 font-display-serif font-bold text-4xl text-stone-900 dark:text-stone-200">
        {primaryLabel}
      </h1>
      <p className="my-0 font-display font-medium italic text-black/50 dark:text-stone-400">
        {secondaryLabel}
      </p>
    </header>
  );
}
