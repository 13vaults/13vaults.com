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
      <div className="bg-stone-700 dark:bg-stone-800 py-2 px-4 text-xl font-display font-semibold rounded-t text-stone-50">
        {header}
      </div>
      <div className="bg-stone-50 dark:bg-stone-600 dark:text-stone-50 p-4 rounded-b gap-4 bg-gradient-to-tl from-amber-50/25 to-stone-50 dark:from-amber-900/25 dark:to-stone-700">
        {children}
      </div>
    </div>
  );
}
