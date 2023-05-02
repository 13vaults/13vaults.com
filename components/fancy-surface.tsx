import clsx from "clsx";

interface FancySurfaceP<T extends React.ElementType> {
  as?: T;
}

export default function FancySurface<T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: FancySurfaceP<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof FancySurfaceP<T>>) {
  const SurfaceComponent = as || "div";
  const classes = clsx(
    className,
    "relative bg-white dark:bg-stone-900 px-8 py-10 rounded-md"
  );

  return (
    <SurfaceComponent className={classes} {...props}>
      <div
        role="presentation"
        className="absolute inset-x-2 inset-y-6 border-2 rounded border-amber-400/75 opacity-75"
      />
      <div
        role="presentation"
        className="absolute inset-x-4 inset-y-4 border-2 rounded border-amber-400/75"
      />
      <div className="relative">{children}</div>
    </SurfaceComponent>
  );
}
