import Container from "@/components/container";
import MegaNav from "@/components/mega-nav";
import { Navigation } from "@/lib/navigation";

export default function BasicLayout({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: Navigation;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="z-[1]">
        <MegaNav navigation={navigation} />
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer>
        <div className="bg-stone-900 text-white">
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
                Media.
              </p>
              <p>
                13Vaults.com is free and open source software.{" "}
                <a href="https://github.com/13vaults/13vaults.com">
                  The source code is available here.
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
