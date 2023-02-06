import { Fragment, useState } from "react";
import { Dialog, Popover, Transition, Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import Container from "./container";
import Link from "next/link";
import { kebabCase, map } from "lodash";
import { Navigation } from "@/lib/navigation";

export default function MegaNav({ navigation }: { navigation: Navigation }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-stone-800 font-display">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-stone-900 border-r border-stone-700 pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-stone-300"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {map(navigation.main, (navItem) => (
                  <Disclosure
                    as="div"
                    key={navItem.name}
                    className="text-white flex flex-col border-t border-stone-700"
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="text-left flex items-center gap-1 p-4 bg-stone-800">
                          {navItem.name}
                          {open ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-4 pt-0 bg-stone-800 flex flex-col gap-4">
                          {map(navItem.subnavs, (subnav) => (
                            <div key={subnav.href}>
                              <p
                                id={`mobile-${kebabCase(subnav.name)}-heading`}
                                className="font-medium text-stone-100"
                              >
                                <Link
                                  href={subnav.href}
                                  onClick={() => setOpen(false)}
                                >
                                  {subnav.name}
                                </Link>
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`mobile-${kebabCase(
                                  subnav.name
                                )}-heading`}
                              >
                                {subnav.items?.map((item) => (
                                  <li key={item.name} className="flex">
                                    <Link
                                      href={item.href}
                                      className="text-stone-400"
                                      onClick={() => setOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                )) ?? null}
                              </ul>
                            </div>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <div className="space-y-6 border-t border-stone-700 py-6 px-4">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <span
                        key={page.name}
                        className="flex items-center font-medium text-stone-600 cursor-not-allowed"
                      >
                        {page.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="relative">
        <nav aria-label="Top">
          <div className="bg-stone-800 px-4 lg:px-8 border-b border-stone-700">
            <Container>
              <div className="flex py-1 lg:py-2 items-center justify-start">
                <div className="flex lg:hidden">
                  <button
                    type="button"
                    className="text-stone-300"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                  </button>
                </div>
                <div className="hidden lg:flex lg:items-center">
                  <Link href="/" className="text-white">
                    <span className="sr-only">13 Vaults</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="h-6 sm:hidden"
                      viewBox="0 0 60 34"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.7 30.7V16.9l1-3-2.8.7H0v-5l9.5-1.3.3 1.9-.3 3.1.5 13.9-.5 3.5H3.7Zm16.7.3a27.2 27.2 0 0 1-3.6-.3L13 29l-.4-6.8 2 1.8 6.2 1.8c1.2 0 2-.2 2.6-.6.5-.5.8-1 .8-1.6 0-.6-.2-1-.6-1.2-.4-.3-1-.4-2-.4h-3.8l-4-5h7.5c.7 0 1.2-.2 1.6-.5.5-.3.7-.7.7-1.3 0-.6-.2-1-.6-1.3a3 3 0 0 0-1.7-.5 13.8 13.8 0 0 0-5.5 1.1l-1.9.7-2.6-5.8 2.6.5a16 16 0 0 1 4.6-1.5c1-.2 2.2-.3 3.5-.3 2.3 0 4 .5 5.3 1.6 1.2 1 1.8 2.5 1.8 4.4a5 5 0 0 1-.7 2.7 6 6 0 0 1-1.4 1.7 5.2 5.2 0 0 1 3 5c.1 5-3.1 7.6-9.5 7.6Zm17.9 3-7.8-22.6.4-3.3-1.7-3.2L26 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L47 1.6h9.8L60 5l-3 6.5L49.5 34H38.3Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="hidden h-6 sm:block"
                      viewBox="0 0 152 34"
                    >
                      <path
                        fillRule="evenodd"
                        d="m56 30.7 1.3-4.6-1.5-4.3h3.6l3-8.3-3-2.2h12.3l4.8 12.3h1l1.1 7.1h-6l-1.4-4h-7.6l-1.2 4H56Zm9.5-8.9h4.1l-1.8-5.4h-.6l-1.7 5.4Zm24 9.2c-3.3 0-5.6-.6-7-2-1.5-1.2-2.2-3.3-2.2-6.2v-7.1l-2-4.4h8.3v10.2l.1 2.2c.2.7.5 1.2.9 1.5.4.4 1 .6 2 .6a4 4 0 0 0 2-.5c.3-.3.6-.8.8-1.5l.1-2.3v-5.8l-2-4.4h8.2v11.5c0 2-.3 3.4-1 4.7-.6 1.1-1.6 2-2.9 2.6a13 13 0 0 1-5.3.9Zm12.8-.3-2.8-5.5 2.8 1.1v-9.8l-.8.3.8-5.5h6.1l2.1-.3-2 5.5v5.2l-.4 3.8h.6l5.8 1.5 1.2-2 2.4 4-1.3 1.7h-14.5Zm18.7 0V16.5l-5.7.3-1.3-6.3 1.3.8h17.5l1.2 6.3-1.2-.8-5.7-.3v9.8l1.4-.3-1.4 4.7h-6.2Z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M142.4 31a17 17 0 0 1-5.7-1 4 4 0 0 1-1.6-.8v-2.9l-2.9-4 2.9 1.2a16.7 16.7 0 0 0 7.6 2c1.1 0 1.7-.2 1.7-.7a1 1 0 0 0-.3-.7l-1.2-.5-2.5-.8-3.2-1.2c-.8-.4-1.5-1-2-1.6-.4-.7-.6-1.6-.6-2.7 0-1.9.8-3.4 2.3-4.6 1.6-1.1 3.8-1.7 6.8-1.7a23.3 23.3 0 0 1 3.5.2l4.3-.7-2.2 2.5v4.7l-7.2-1.8c-.7 0-1 .3-1 .8 0 .3.1.7.6 1l2.6 1c1.7.5 3 1 4 1.6A5 5 0 0 1 151 25a5.7 5.7 0 0 1-2.2 4.4 10.7 10.7 0 0 1-6.5 1.7ZM3.7 30.7V16.9l1-3-2.8.7H0v-5l9.5-1.3.3 1.9-.3 3.1.5 13.9-.5 3.5H3.7Zm16.7.3a27.2 27.2 0 0 1-3.6-.3L13 29l-.4-6.8 2 1.8 6.2 1.8c1.2 0 2-.2 2.6-.6.5-.5.8-1 .8-1.6 0-.6-.2-1-.6-1.2-.4-.3-1-.4-2-.4h-3.8l-4-5h7.5c.7 0 1.2-.2 1.6-.5.5-.3.7-.7.7-1.3 0-.6-.2-1-.6-1.3a3 3 0 0 0-1.7-.5 13.8 13.8 0 0 0-5.5 1.1l-1.9.7-2.6-5.8 2.6.5a16 16 0 0 1 4.6-1.5c1-.2 2.2-.3 3.5-.3 2.3 0 4 .5 5.3 1.6 1.2 1 1.8 2.5 1.8 4.4a5 5 0 0 1-.7 2.7 6 6 0 0 1-1.4 1.7 5.2 5.2 0 0 1 3 5c.1 5-3.1 7.6-9.5 7.6Zm17.9 3-7.8-22.6.4-3.3-1.7-3.2L26 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L47 1.6h9.8L60 5l-3 6.5L49.5 34H38.3Z"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="hidden h-full lg:flex">
                  <Popover.Group className="ml-8">
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.main.map((mainNav) => (
                        <Popover key={mainNav.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  className={clsx(
                                    open
                                      ? "border-teal-600 text-teal-600"
                                      : "border-transparent text-stone-400 hover:text-stone-300",
                                    "relative items-center gap-1 z-20 -mb-px flex border-b-2 pt-px font-medium transition-colors duration-200 ease-out"
                                  )}
                                >
                                  {mainNav.name}
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
                                    className="absolute inset-0 top-1/2 bg-stone-800 shadow"
                                    aria-hidden="true"
                                  />

                                  <div className="relative bg-stone-800 border-b border-stone-700">
                                    <Container className="text-sm">
                                      <div className="font-sans grid grid-cols-1 items-start gap-y-10 gap-x-8 py-6">
                                        <div className="grid grid-cols-5 gap-y-10 gap-x-8">
                                          {map(
                                            mainNav.subnavs,
                                            (mainNavItem) => (
                                              <div
                                                key={mainNavItem.name}
                                                className={clsx({
                                                  "col-span-2":
                                                    mainNavItem.large,
                                                })}
                                              >
                                                <Popover.Button
                                                  as={Link}
                                                  id={`desktop-featured-heading-${kebabCase(
                                                    mainNavItem.name
                                                  )}`}
                                                  className="text-stone-400 border-b-2 hover:text-teal-400 focus:text-teal-400 border-transparent focus:hover:border-teal-400 hover:border-teal-400"
                                                  href={mainNavItem.href}
                                                >
                                                  {mainNavItem.name}
                                                </Popover.Button>
                                                <ul
                                                  role="list"
                                                  aria-labelledby={`desktop-featured-heading-${kebabCase(
                                                    mainNavItem.name
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

                      {navigation.pages.map((page) =>
                        page.href ? (
                          <Link
                            key={page.href}
                            href={page.href}
                            className="text-stone-400 border-b-2 hover:text-teal-400 focus:text-teal-400 border-transparent focus:hover:border-teal-400 hover:border-teal-400"
                          >
                            {page.name}
                          </Link>
                        ) : (
                          <span
                            key={page.name}
                            className="flex items-center font-medium text-stone-600 cursor-not-allowed"
                          >
                            {page.name}
                          </span>
                        )
                      )}
                    </div>
                  </Popover.Group>
                </div>

                <div className="lg:hidden mx-auto text-white absolute inset-0 grid place-content-center pointer-events-none">
                  <Link href="/" className="pointer-events-auto">
                    <span className="sr-only">13 Vaults</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="h-6 sm:hidden"
                      viewBox="0 0 60 34"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.7 30.7V16.9l1-3-2.8.7H0v-5l9.5-1.3.3 1.9-.3 3.1.5 13.9-.5 3.5H3.7Zm16.7.3a27.2 27.2 0 0 1-3.6-.3L13 29l-.4-6.8 2 1.8 6.2 1.8c1.2 0 2-.2 2.6-.6.5-.5.8-1 .8-1.6 0-.6-.2-1-.6-1.2-.4-.3-1-.4-2-.4h-3.8l-4-5h7.5c.7 0 1.2-.2 1.6-.5.5-.3.7-.7.7-1.3 0-.6-.2-1-.6-1.3a3 3 0 0 0-1.7-.5 13.8 13.8 0 0 0-5.5 1.1l-1.9.7-2.6-5.8 2.6.5a16 16 0 0 1 4.6-1.5c1-.2 2.2-.3 3.5-.3 2.3 0 4 .5 5.3 1.6 1.2 1 1.8 2.5 1.8 4.4a5 5 0 0 1-.7 2.7 6 6 0 0 1-1.4 1.7 5.2 5.2 0 0 1 3 5c.1 5-3.1 7.6-9.5 7.6Zm17.9 3-7.8-22.6.4-3.3-1.7-3.2L26 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L47 1.6h9.8L60 5l-3 6.5L49.5 34H38.3Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="hidden h-6 sm:block"
                      viewBox="0 0 152 34"
                    >
                      <path
                        fillRule="evenodd"
                        d="m56 30.7 1.3-4.6-1.5-4.3h3.6l3-8.3-3-2.2h12.3l4.8 12.3h1l1.1 7.1h-6l-1.4-4h-7.6l-1.2 4H56Zm9.5-8.9h4.1l-1.8-5.4h-.6l-1.7 5.4Zm24 9.2c-3.3 0-5.6-.6-7-2-1.5-1.2-2.2-3.3-2.2-6.2v-7.1l-2-4.4h8.3v10.2l.1 2.2c.2.7.5 1.2.9 1.5.4.4 1 .6 2 .6a4 4 0 0 0 2-.5c.3-.3.6-.8.8-1.5l.1-2.3v-5.8l-2-4.4h8.2v11.5c0 2-.3 3.4-1 4.7-.6 1.1-1.6 2-2.9 2.6a13 13 0 0 1-5.3.9Zm12.8-.3-2.8-5.5 2.8 1.1v-9.8l-.8.3.8-5.5h6.1l2.1-.3-2 5.5v5.2l-.4 3.8h.6l5.8 1.5 1.2-2 2.4 4-1.3 1.7h-14.5Zm18.7 0V16.5l-5.7.3-1.3-6.3 1.3.8h17.5l1.2 6.3-1.2-.8-5.7-.3v9.8l1.4-.3-1.4 4.7h-6.2Z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M142.4 31a17 17 0 0 1-5.7-1 4 4 0 0 1-1.6-.8v-2.9l-2.9-4 2.9 1.2a16.7 16.7 0 0 0 7.6 2c1.1 0 1.7-.2 1.7-.7a1 1 0 0 0-.3-.7l-1.2-.5-2.5-.8-3.2-1.2c-.8-.4-1.5-1-2-1.6-.4-.7-.6-1.6-.6-2.7 0-1.9.8-3.4 2.3-4.6 1.6-1.1 3.8-1.7 6.8-1.7a23.3 23.3 0 0 1 3.5.2l4.3-.7-2.2 2.5v4.7l-7.2-1.8c-.7 0-1 .3-1 .8 0 .3.1.7.6 1l2.6 1c1.7.5 3 1 4 1.6A5 5 0 0 1 151 25a5.7 5.7 0 0 1-2.2 4.4 10.7 10.7 0 0 1-6.5 1.7ZM3.7 30.7V16.9l1-3-2.8.7H0v-5l9.5-1.3.3 1.9-.3 3.1.5 13.9-.5 3.5H3.7Zm16.7.3a27.2 27.2 0 0 1-3.6-.3L13 29l-.4-6.8 2 1.8 6.2 1.8c1.2 0 2-.2 2.6-.6.5-.5.8-1 .8-1.6 0-.6-.2-1-.6-1.2-.4-.3-1-.4-2-.4h-3.8l-4-5h7.5c.7 0 1.2-.2 1.6-.5.5-.3.7-.7.7-1.3 0-.6-.2-1-.6-1.3a3 3 0 0 0-1.7-.5 13.8 13.8 0 0 0-5.5 1.1l-1.9.7-2.6-5.8 2.6.5a16 16 0 0 1 4.6-1.5c1-.2 2.2-.3 3.5-.3 2.3 0 4 .5 5.3 1.6 1.2 1 1.8 2.5 1.8 4.4a5 5 0 0 1-.7 2.7 6 6 0 0 1-1.4 1.7 5.2 5.2 0 0 1 3 5c.1 5-3.1 7.6-9.5 7.6Zm17.9 3-7.8-22.6.4-3.3-1.7-3.2L26 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L47 1.6h9.8L60 5l-3 6.5L49.5 34H38.3Z"
                      />
                    </svg>
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
