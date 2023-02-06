import { filter, findIndex, map, startCase } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "./container";

function createPaths(path: string) {
  const linkPath = filter(path.split("/"), (str) => str !== "");
  const hashUrlIdx = findIndex(linkPath, (str) => str.startsWith("#"));
  const finalLinkPath =
    hashUrlIdx >= 0 ? filter(linkPath, (_, i) => i < hashUrlIdx) : linkPath;

  return map(finalLinkPath, (path, i) => {
    return {
      breadcrumb: startCase(path),
      href: "/" + linkPath.slice(0, i + 1).join("/"),
    };
  });
}

export default function CompendiumBreadcrumbs() {
  const router = useRouter();
  const paths = createPaths(router.asPath);

  return (
    <Container>
      <nav className="hidden sm:flex" aria-label="Breadcrumb">
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
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-stone-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <Link
                  href={path.href}
                  className="ml-2 text-sm font-medium text-stone-400 hover:text-stone-200"
                >
                  {path.breadcrumb}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </Container>
  );
}
