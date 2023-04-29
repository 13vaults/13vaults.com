import clsx from "clsx";

interface ButtonProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "none";
  size?: "normal" | "large";
  variant?: "normal" | "decorative";
}

export default function Button<T extends React.ElementType = "button">({
  as,
  className,
  size = "normal",
  color = "primary",
  ...props
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const shapeClassMap: Record<typeof size, string> = {
    normal: "py-1 px-3",
    large: "px-8 py-3",
  };

  const colorClassMap: Record<typeof color, string> = {
    primary:
      "text-white focus:bg-teal-600 hover:bg-teal-600 bg-teal-700 border border-teal-400/50 hover:border-teal-400",
    secondary:
      "text-white focus:bg-stone-600 hover:bg-stone-600 bg-stone-700 border border-stone-400/50 hover:border-stone-400",
    none: "",
  };

  const shapeClasses = clsx(shapeClassMap[size]);
  const colorClasses = clsx(colorClassMap[color]);
  const classes = clsx(
    className,
    shapeClasses,
    colorClasses,
    "transition-colors"
  );
  const Component = as || "button";

  return <Component {...props} className={classes} />;
}
