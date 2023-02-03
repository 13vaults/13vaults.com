export default function VaultHeader({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <hgroup className="not-prose">
      <h1 className="my-0 font-display-serif font-bold text-4xl text-stone-900">
        {primaryLabel}
      </h1>
      <p className="my-0 font-display font-medium italic text-black/50">
        {secondaryLabel}
      </p>
    </hgroup>
  );
}
