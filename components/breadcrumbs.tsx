import Link from "next/link";
import { useRouter } from "next/router";

export default function Breadcrumbs() {
  const router = useRouter();
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
        <li className="flex items-center">
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
              href="#"
              className="ml-2 text-sm font-medium text-neutral-400 hover:text-neutral-200"
            >
              Vaults
            </Link>
          </div>
        </li>
        <li className="flex items-center">
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
              href="#"
              className="ml-2 text-sm font-medium text-neutral-400 hover:text-neutral-200"
            >
              Classes
            </Link>
          </div>
        </li>
        <li className="flex items-center">
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
              href="/vaults/classes/savage"
              className="ml-2 text-sm font-medium text-neutral-400 hover:text-neutral-200"
            >
              The Savage
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  );
}
