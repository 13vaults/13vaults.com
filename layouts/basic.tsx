import MegaNav from "@/components/mega-nav";
import { Navigation } from "@/lib/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function BasicLayout({
  children,
  navigation,
  className,
}: {
  children: React.ReactNode;
  navigation: Navigation;
  className?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="z-[1] lg:sticky top-0 shadow">
        <MegaNav navigation={navigation} />
      </header>
      <div className={clsx("flex flex-col flex-1 relative z-0", className)}>
        {children}
      </div>
      <footer>
        <div className="bg-stone-900 text-white">
          <div className="p-4 flex flex-col gap-2 items-center justify-center">
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
            <div className="prose prose-sm prose-invert prose-p:my-0 prose-p:leading-tight text-xs text-justify text-align-last-center text-white/50 font-display font-medium">
              <p>
                13Vaults.com is not affilliated with Pelgrane Press or Fire Opal
                Media.
              </p>
              <p>
                13Vaults.com is free and open source software (FOSS).
                <br />
                <Link href="https://github.com/13vaults/13vaults.com">
                  The source code is available here.
                </Link>
              </p>
              <div className="flex gap-1 flex-1 justify-center">
                <p>
                  <Link href="/privacy/">Privacy Policy.</Link>
                </p>
                <span>&middot;</span>
                <p>
                  <Link href="/legal/">Legal Information.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
