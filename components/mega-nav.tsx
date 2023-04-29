import { Fragment, useCallback, useState } from "react";
import { Popover, Transition, Disclosure } from "@headlessui/react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import Container from "./container";
import Link from "next/link";
import { kebabCase, map, size } from "lodash-es";
import { Navigation, SubNav, SubNavWithName } from "@/lib/navigation";
import { useTranslation } from "next-i18next";
import { PartialBy, PickPartial } from "@/utils";
import VaultsLogo from "./vaults-logo";
import {
  AnimatePresence,
  cubicBezier,
  m,
  useReducedMotion,
} from "framer-motion";
import Button from "./button";

interface MobileSubnavP {
  subnav: PartialBy<
    PickPartial<SubNav, "labelKey" | "items" | "href" | "name">,
    "labelKey" | "name"
  >;
  onLinkClick: Function;
}

function MobileSubnavPlain({ subnav, onLinkClick }: MobileSubnavP) {
  const { t } = useTranslation("common");

  return (
    <div>
      <p
        id={`mobile-${kebabCase(subnav.labelKey)}-heading`}
        className="text-stone-100 font-bold"
      >
        <Link
          href={subnav.href}
          className="block p-4 hover:bg-stone-400/5"
          onClick={() => onLinkClick()}
        >
          {subnav.name || t(subnav.labelKey as string)}
        </Link>
      </p>
    </div>
  );
}

function MobileSubnavWithItems({ subnav, onLinkClick }: MobileSubnavP) {
  const { t } = useTranslation("common");

  return (
    <Disclosure as="div" className="bg-stone-400/10 flex flex-col">
      {({ open }) => (
        <>
          <Disclosure.Button className="bg-stone-400/10 hover:bg-stone-400/20 text-left flex items-center gap-1 p-4 ">
            {subnav.name || t(subnav.labelKey as string)}
            {open ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </Disclosure.Button>
          <Disclosure.Panel as="ul" className="ps-2">
            {subnav.items?.map((item) => (
              <li key={item?.name} className="flex flex-col">
                <MobileSubnav
                  onLinkClick={onLinkClick}
                  subnav={item as SubNavWithName}
                />
              </li>
            )) ?? null}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function MobileSubnav({ subnav, onLinkClick }: MobileSubnavP) {
  const Component =
    size(subnav.items) > 0 ? MobileSubnavWithItems : MobileSubnavPlain;

  return <Component subnav={subnav} onLinkClick={onLinkClick} />;
}

export default function MegaNav({ navigation }: { navigation: Navigation }) {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("common");

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const easeOutQuart = cubicBezier(0.25, 1, 0.5, 1);

  const AnimatedDialogContent = m(DialogContent);

  return (
    <div className="bg-stone-950">
      <div className="flex">
        <AnimatePresence>
          {open ? (
            <DialogOverlay
              key="dialog"
              onDismiss={closeDrawer}
              className="fixed top-14 left-0 right-0 bottom-0"
            >
              <m.div
                className="absolute inset-0 bg-black/60"
                initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
                transition={{
                  ease: easeOutQuart,
                  duration: shouldReduceMotion ? 0 : 0.3,
                }}
              ></m.div>
              <AnimatedDialogContent
                transition={{
                  ease: easeOutQuart,
                  duration: shouldReduceMotion ? 0 : 0.3,
                }}
                initial={{ x: shouldReduceMotion ? 0 : "calc(100% * -1)" }}
                animate={{ x: 0 }}
                exit={{ x: shouldReduceMotion ? 0 : "calc(100% * -1)" }}
                className="fixed top-14 bottom-0 right-0 left-0 flex w-full max-w-xs flex-col overflow-y-auto bg-stone-950 border-r border-stone-800 pb-12 shadow-xl"
              >
                {map(navigation.main, (navItem) => (
                  <Disclosure
                    as="div"
                    key={navItem.labelKey}
                    className="text-white flex flex-col border-t border-stone-800 font-serif font-bold"
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="text-left flex items-center gap-1 p-4 bg-stone-900">
                          {t(navItem.labelKey)}
                          {open ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-0 bg-stone-900 flex flex-col">
                          {map(navItem.subnavs, (subnav) => (
                            <MobileSubnav
                              onLinkClick={() => setOpen(false)}
                              key={subnav.href}
                              subnav={subnav}
                            />
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <div className="flex flex-col border-t border-stone-800 py-2">
                  {navigation.pages.map((page) => (
                    <div
                      key={page.labelKey}
                      className="flow-root font-bold font-serif"
                    >
                      {page.href ? (
                        <Link
                          className="flex p-4 items-center text-stone-200 hover:bg-stone-800 transition-colors"
                          href={page.href}
                          onClick={() => setOpen(false)}
                        >
                          {t(page.labelKey)}
                        </Link>
                      ) : (
                        <span className="flex p-4 items-center text-stone-600 cursor-not-allowed">
                          {t(page.labelKey)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex-col">
                  <a
                    href="https://pelgranepress.com/product-category/d20-games/archmage-engine/13th-age/"
                    className="flex items-center bg-gradient-to-bl from-transparent to-amber-600 bg-amber-500 shadow-md shadow-amber-800 text-white p-4 focus:bg-amber-400 hover:bg-amber-400 transition-colors font-bold font-serif"
                  >
                    {t("nav.buy-13th-age-label")}
                  </a>
                </div>
              </AnimatedDialogContent>
            </DialogOverlay>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="relative">
        <nav aria-label="Top">
          <div className="bg-stone-950 px-4 lg:px-8 shadow h-14 flex items-center">
            <Container className="flex-1">
              <div className="flex py-1 lg:py-2 items-center justify-start gap-8">
                <div className="flex lg:hidden">
                  <button
                    type="button"
                    className="text-stone-300 disabled:opacity-50"
                    onClick={open ? closeDrawer : openDrawer}
                  >
                    <span className="sr-only">
                      {open
                        ? t("nav.close-menu-label")
                        : t("nav.open-menu-label")}
                    </span>
                    {open ? (
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div className="hidden lg:flex lg:items-center">
                  <Link href="/" className="text-white">
                    <span className="sr-only">13 Vaults</span>
                    <VaultsLogo
                      variant="full"
                      className="hidden h-6 sm:block"
                    />
                  </Link>
                </div>

                <div className="hidden h-full lg:flex gap-8 flex-1">
                  <Popover.Group>
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.main.map((mainNav) => (
                        <Popover key={mainNav.labelKey} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  className={clsx(
                                    open
                                      ? "border-teal-600 text-teal-600"
                                      : "border-transparent text-stone-200 hover:text-stone-300",
                                    "font-serif font-bold relative items-center gap-1 -mb-px flex border-b-2 pt-px transition-colors duration-200 ease-out"
                                  )}
                                >
                                  {t(mainNav.labelKey)}
                                  {open ? (
                                    <ChevronUpIcon className="h-4 w-4" />
                                  ) : (
                                    <ChevronDownIcon className="h-4 w-4" />
                                  )}
                                </Popover.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute inset-x-0 top-full text-stone-300">
                                  <div
                                    className="absolute inset-0 top-1/2 bg-stone-950 shadow"
                                    aria-hidden="true"
                                  />

                                  <div className="relative bg-stone-950 border-y border-stone-800 px-8">
                                    <Container>
                                      <div className="grid grid-cols-1 items-start gap-y-10 gap-x-8 py-6">
                                        <div className="grid grid-cols-5 gap-y-10 gap-x-8">
                                          {map(
                                            mainNav.subnavs,
                                            (mainNavItem) => (
                                              <div
                                                key={mainNavItem.labelKey}
                                                className={clsx({
                                                  "col-span-2":
                                                    mainNavItem.large,
                                                })}
                                              >
                                                <Popover.Button
                                                  as={Link}
                                                  id={`desktop-featured-heading-${kebabCase(
                                                    mainNavItem.labelKey
                                                  )}`}
                                                  className="font-bold font-serif text-stone-200 border-b-2 hover:text-teal-400 focus:text-teal-400 border-transparent focus:hover:border-teal-400 hover:border-teal-400"
                                                  href={mainNavItem.href}
                                                >
                                                  {t(mainNavItem.labelKey)}
                                                </Popover.Button>
                                                <ul
                                                  role="list"
                                                  aria-labelledby={`desktop-featured-heading-${kebabCase(
                                                    mainNavItem.labelKey
                                                  )}`}
                                                  className={clsx(
                                                    "mt-6 grid gap-1 sm:mt-4",
                                                    mainNavItem.large
                                                      ? "grid-cols-2"
                                                      : "grid-cols-1"
                                                  )}
                                                >
                                                  {map(
                                                    mainNavItem.items,
                                                    (subNav) => (
                                                      <li key={subNav.name}>
                                                        <Popover.Button
                                                          as={Link}
                                                          href={subNav.href}
                                                          className="border-b-2 hover:text-teal-400 focus:text-teal-400 border-transparent focus:hover:border-teal-400 hover:border-teal-400"
                                                        >
                                                          {subNav.name}
                                                        </Popover.Button>
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </Container>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}
                    </div>
                  </Popover.Group>

                  <div className="flex flex-1 gap-8 justify-between">
                    <div className="flex gap-8 font-bold">
                      {navigation.pages.map((page) =>
                        page.href ? (
                          <Link
                            key={page.href}
                            href={page.href}
                            className="font-bold font-serif items-center -mb-px flex pt-px transition-colors duration-200 ease-out text-stone-200 border-b-2 hover:text-teal-600 focus:text-teal-600 border-transparent focus:hover:border-teal-600 hover:border-teal-600"
                          >
                            {t(page.labelKey)}
                          </Link>
                        ) : (
                          <span
                            key={page.labelKey}
                            className="font-bold font-serif flex items-center text-stone-600 cursor-not-allowed"
                          >
                            {t(page.labelKey)}
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        as="a"
                        href="https://pelgranepress.com/product-category/d20-games/archmage-engine/13th-age/"
                        color="gold"
                        variant="fancy"
                        className="font-serif font-bold inline-block"
                      >
                        {t("nav.buy-13th-age-label")}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="lg:hidden mx-auto text-white absolute inset-0 grid place-content-center pointer-events-none">
                  <Link href="/" className="pointer-events-auto">
                    <span className="sr-only">13 Vaults</span>
                    <VaultsLogo className="h-6 sm:hidden" variant="small" />
                    <VaultsLogo
                      className="hidden h-6 sm:block"
                      variant="full"
                    />
                  </Link>
                </div>
              </div>
            </Container>
          </div>
        </nav>
      </div>
    </div>
  );
}
