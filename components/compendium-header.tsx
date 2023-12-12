import CompendiumTitle from "./compendium-title";
import { RadioGroup } from '@headlessui/react'
import { useBookStore, isSourceEnabled, getVV } from "@/lib/books";

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

  const bookStore = useBookStore((state) => state); // everything in the store can affect the render!
  const getVersion = () => {
    // this is not a pure getter - it also makes sure the store has an entry for the current page
    let currentVersion = getVV(bookStore,"version"); 
    if(currentVersion) // it's possible the sourcebook containing the version is no longer enabled
    {
      const matchingVersionObj = versions.filter((version) => version.name == currentVersion);
      if (matchingVersionObj && matchingVersionObj[0].source && !isSourceEnabled(bookStore, matchingVersionObj[0].source))
        currentVersion = null;
    }
    if(!currentVersion)
    {
      bookStore.setDocumentVV(primaryLabel,"version",versions[0].name);
      return versions[0].name;
    }
    return currentVersion;
  };
  const hasMultipleOptions = () => {
    const options = versions.filter( (version) => 
      !version.source || isSourceEnabled(bookStore,version.source)) 
    return options.length > 1;
  }
  bookStore.setCurrentDocument(primaryLabel);
  return (
    <header className="not-prose">
      <div className="flex flex-row justify-between">
      <div>
        <CompendiumTitle>{primaryLabel}</CompendiumTitle>
        <p className="my-0 font-serif font-medium italic text-black/50 dark:text-stone-400">
          {secondaryLabel}
        </p>
      </div>
      {versions && (
        <RadioGroup value={getVersion()} onChange={(value)=>bookStore.setDocumentVV(primaryLabel,"version",value)}
        as="div" className="max-w-[80%]"
        >
        <div className="flex-row justify-end">
          {hasMultipleOptions() &&  versions.map((version) => {
            if(version.source && !isSourceEnabled(bookStore, version.source))
            {
              return null;
            }
            return (
              <RadioGroup.Option key={version.name} value={version.name} 
                as="div" className="inline-block">
                {({active, checked}) => (
                  <div className={(checked? 
                    'bg-amber-500 text-black border-amber-500':
                    'bg-white/5 border-black hover:border-amber-500')+ 
                    ' py-0.5 px-2 border-2 border-solid'}>
                    {version.name}
                  </div>
                )}
              </RadioGroup.Option>
            )}
          )}
        </div>
        </RadioGroup>
      )}
      </div>
    </header>
  );
}
