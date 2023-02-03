import BasicLayout from "@/layouts/basic";
import Link from "next/link";

export default function VaultsAppHome() {
  return (
    <BasicLayout>
      <section className="min-h-[85vh] bg-neutral-900 text-white grid place-content-center home-hero bg-cover bg-top">
        <div className="flex flex-col gap-12 p-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold block text-center">
            Discover the 13 Vaults
          </h1>
          <div className="prose prose-invert prose-p:my-1 prose-p:text-justify prose-p:leading-tight">
            <p>
              The 13 Vaults is an unofficial community-driven resource site for
              13th Age&mdash;a fun and exciting RPG that innovates on the
              classic d20 system. Inside you'll find many resources and tools
              for GMs and players alike, from class reference pages to character
              guides and much more.
            </p>
          </div>
          <div className="grid place-content-center">
            <Link
              className="flex gap-3 focus:bg-emerald-500 hover:bg-emerald-500 bg-emerald-600 rounded pl-8 pr-12 py-3 shadow"
              href="/vaults/classes/savage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-5 w-5"
                viewBox="0 0 34 34"
              >
                <path
                  fillRule="evenodd"
                  d="M12.3 34 4.5 11.4 5 8.1 3.2 4.9 0 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L21 1.6h9.8L34 5l-3 6.5L23.5 34H12.3Z"
                />
              </svg>
              <span>Enter the Vaults</span>
            </Link>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
}
