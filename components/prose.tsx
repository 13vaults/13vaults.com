import clsx from "clsx";

interface ProseP {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Prose({
  as: Element = "div",
  className = "",
  ...properties
}: ProseP) {
  return (
    <Element
      className={clsx(
        "prose prose-h1:my-0 prose-h2:mt-8 max-w-none prose-headings:font-bold prose-headings:font-serif prose-lead:leading-normal prose-lead:font-serif prose-table:my-0 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-500/5 dark:prose-blockquote:bg-teal-500/20 dark:prose-blockquote:text-white prose-blockquote:font-serif prose-blockquote:shadow-md prose-h2:text-2xl lg:prose-h2:text-3xl prose-th:font-display prose-th:font-medium prose-h2:border-b-2 prose-h2:border-stone-300 dark:prose-h2:border-stone-600 prose-th:p-2 prose-thead:shadow-sm prose-th:align-bottom prose-thead:bg-white dark:prose-thead:bg-stone-700 prose-table:whitespace-nowrap prose-blockquote:pr-6 dark:prose-invert dark:prose-tr:border-stone-800 dark:prose-thead:border-stone-900 prose-lead:text-stone-700 dark:prose-lead:text-stone-200 prose-teal prose-table:bg-stone-50 dark:prose-table:bg-stone-800 prose-td:px-2 even:prose-tr:bg-stone-100 dark:even:prose-tr:bg-stone-900",
        className
      )}
      {...properties}
    />
  );
}
