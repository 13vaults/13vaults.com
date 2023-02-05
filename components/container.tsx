import clsx from "clsx";

export default function Container({ children, className }: any) {
  return (
    <div className={clsx("mx-auto xl:max-w-5xl max-w-4xl", className)}>
      {children}
    </div>
  );
}
