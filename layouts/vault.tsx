import { capitalize, filter, map } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import BasicLayout from "./basic";

function createPaths(path: string) {
  const linkPath = filter(path.split("/"), (str) => str !== "");

  return map(linkPath, (path, i) => {
    return {
      breadcrumb: capitalize(path),
      href: "/" + linkPath.slice(0, i + 1).join("/"),
    };
  });
}

function Breadcrumbs() {
  const router = useRouter();
  const paths = createPaths(router.asPath);

  return (
    <nav
      className="flex xl:max-w-7xl max-w-6xl mx-auto"
      aria-label="Breadcrumb"
    >
      <ol role="list" className="flex gap-2 py-1">
        <li className="flex items-center">
          <div className="flex items-center">
            <Link href="/" className="text-teal-500 hover:text-teal-300">
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
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {map(paths, (path) => (
          <li className="flex items-center" key={path.href}>
            <div className="flex items-center">
              <svg
                className="h-6 w-6 flex-shrink-0 text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                href={path.href}
                className="ml-2 text-sm font-medium text-neutral-400 hover:text-neutral-200"
              >
                {path.breadcrumb}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function VaultLayout(props: any) {
  return (
    <BasicLayout>
      <div className="bg-stone-900 px-8">
        <Breadcrumbs />
      </div>
      <main className="p-8">
        <div className="mx-auto xl:max-w-7xl max-w-6xl">
          <article
            className="prose prose-h1:my-0 prose-h2:mt-0 text-justify max-w-none prose-headings:font-serif prose-lead:leading-normal prose-lead:font-display prose-blockquote:border-teal-500 prose-blockquote:bg-white prose-blockquote:font-serif prose-blockquote:shadow-md prose-table:text-sm prose-table:whitespace-nowrap prose-th:font-display prose-thead:whitespace-normal prose-th:p-2 prose-thead:shadow-sm prose-th:align-bottom prose-thead:bg-white"
            {...props}
          />
        </div>
      </main>
    </BasicLayout>
  );
}
