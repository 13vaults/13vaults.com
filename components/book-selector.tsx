import { useMemo } from "react";
import { Popover, Switch, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import BookIcon from "@heroicons/react/20/solid/BookOpenIcon";
import { useBookStore } from "@/lib/books";

export function BookSelector() {
  const { t } = useTranslation();
  const {enabledBooks, toggleEnabledBook} = useBookStore();

  const ThemeIcon = useMemo(() => {
    return BookIcon;
  });

  return (
    <Popover as="div" horizontal>
            <Popover.Button
              className="flex p-2 items-center justify-center shadow-md shadow-black/5 ring-1 bg-stone-800 ring-inset ring-white/5"
              aria-label={t("theme-switcher") as string}
            >
              <ThemeIcon className="block h-5 w-5 fill-stone-400" />
            </Popover.Button>

          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-200 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
          >
          <Popover.Panel
                className="absolute top-full mt-0 w-72 right-0 text-sm font-medium shadow-md shadow-black/5 ring-1 bg-stone-900 ring-white/5"
                >
                <>
                <h3 className="font-serif font-bold text-center p-2">Additional content</h3>
                {enabledBooks.map( (book, index) => (
                  <div className="text-stone-400 p-2">
                  <Switch
                    checked={book[2]}
                    onChange={ () => toggleEnabledBook(index) }
                    className={(book[2] ? 'bg-amber-500' : 'bg-amber-900') +
                    " relative inline-flex h-4 w-8 items-center rounded-full"}>
                      {({checked}) => (
                        <>
                          <span 
                            className={`${
                              checked ? 'translate-x-4' : 'translate-x-1'
                            } translate-x-1 inline-block h-3 w-3 transform rounded-full bg-white transition`}>
                          </span>
                        </>
                    )}
                  </Switch>
                  <span className="w-fit p-2">{book[1]}</span>
                  </div>
                ))}
                </>
          </Popover.Panel>
          </Transition>
    </Popover>
  );
  
}
