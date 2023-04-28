import { ReactNode } from "react";

export default function CompendiumContentSection({
  header = null,
  children = null,
}: {
  header?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="shadow">
      <div className="bg-stone-700 dark:bg-stone-800 py-2 px-4 text-xl font-serif font-semibold rounded-t text-stone-50 border-b border-stone-900">
        {header}
      </div>
      <div className="bg-stone-50 dark:bg-stone-900 dark:text-stone-50 p-4 rounded-b gap-4 bg-gradient-to-tl dark:bg-gradient-to-br from-teal-50/25 to-stone-50 dark:from-teal-900/25 dark:to-transparent">
        {children}
      </div>
    </div>
  );
}
