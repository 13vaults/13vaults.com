import Link from "next/link";

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="bg-neutral-800 px-8 py-2 text-white">
          <div className="mx-auto flex xl:max-w-7xl max-w-6xl items-center justify-center">
            <h1 className="font-display text-3xl font-black">
              <Link href="/">
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
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer>
        <div className="bg-zinc-900 text-white">
          <div className="p-4 flex gap-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-6 w-6"
              viewBox="0 0 34 34"
            >
              <path
                fillRule="evenodd"
                d="M12.3 34 4.5 11.4 5 8.1 3.2 4.9 0 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L21 1.6h9.8L34 5l-3 6.5L23.5 34H12.3Z"
              />
            </svg>
            <div className="text-xs text-white/50 font-display font-medium">
              <p>
                13Vaults.com is not affilliated with Pelgrane Press or Fire Opal
                studios.
              </p>
              <p>
                <a href="https://codeberg.org/sean/13vaults">
                  13Vaults.com source code is available here.
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
