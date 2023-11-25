import CompendiumTitle from "./compendium-title";
import { RadioGroup } from '@headlessui/react'
import { useBookStore, isSourceEnabled } from "@/lib/books";

export default function VaultHeader({
  primaryLabel,
  secondaryLabel,
  versions = null,
  variants = null
}: {
  primaryLabel: string;
  secondaryLabel: string;
  versions: any;
  variants: any;
}) {

  const bookStore = useBookStore();
  return (
    <header className="not-prose">
      <div class="flex flex-row justify-between">
      <div>
        <CompendiumTitle>{primaryLabel}</CompendiumTitle>
        <p className="my-0 font-serif font-medium italic text-black/50 dark:text-stone-400">
          {secondaryLabel}
        </p>
      </div>
        <RadioGroup>
        <div class="flex flex-row justify-end">
          {versions && versions.map((version) => {
            if(version.source && !isSourceEnabled(bookStore, version.source))
            {
              return null;
            }
            return (
              <RadioGroup.Option key={version.name} value={version.name}>
                {({active, checked}) => (
                  <div className={(checked? 
                    'bg-amber-500 text-black border-amber-500':
                    'bg-white/5 border-gray-500')+ 
                    ' py-0.5 px-2 border-2 border-solid'}>
                    {version.name}
                  </div>
                )}
              </RadioGroup.Option>
            )}
          )}
        </div>
        </RadioGroup>
      </div>
    </header>
  );
}
