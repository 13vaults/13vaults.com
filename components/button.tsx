import clsx from "clsx";

type ColorClassMapT = {
  borderClasses: string;
  backgroundClasses: string;
  textClasses: string;
  decorativeBorderClasses: string;
};

type paletteColor = "primary" | "secondary" | "gold";

interface ButtonProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode | null;
  className?: string;
  color?: paletteColor;
  size?: "normal" | "large";
  variant?: "normal" | "decorative" | "fancy";
}

export default function Button<T extends React.ElementType = "button">({
  as,
  className,
  size = "normal",
  color = "primary",
  variant = "normal",
  children,
  ...props
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  type ShapeClassMapT = {
    paddingClasses: string;
  };

  const shapeClassMap: Record<typeof size, ShapeClassMapT> = {
    normal: {
      paddingClasses: "py-1 px-3",
    },
    large: {
      paddingClasses: "px-8 py-3",
    },
  };

  const colorClassMap: Record<paletteColor, ColorClassMapT> = {
    primary: {
      textClasses: "text-white",
      backgroundClasses:
        "group-focus:bg-teal-600 group-hover:bg-teal-600 bg-teal-700",
      borderClasses:
        "border border-teal-600 hover:border-teal-600 group-hover:border-teal-600",
      decorativeBorderClasses: "border-teal-600",
    },
    secondary: {
      textClasses: "text-white",
      backgroundClasses:
        "group-focus:bg-stone-500 group-hover:bg-stone-500 bg-stone-600",
      borderClasses:
        "border border-stone-500 hover:border-stone-500 group-hover:border-stone-500",
      decorativeBorderClasses: "border-stone-500",
    },
    gold: {
      textClasses: "text-white",
      backgroundClasses:
        "group-focus:bg-amber-400 group-hover:bg-amber-400 bg-amber-500",
      borderClasses:
        "border border-amber-400 hover:border-amber-400 group-hover:border-amber-400",
      decorativeBorderClasses: "border-amber-400",
    },
  };

  const shapeClasses = clsx(shapeClassMap[size].paddingClasses);

  const colorClasses = clsx(
    colorClassMap[color].textClasses,
    colorClassMap[color].backgroundClasses
  );

  const classes = clsx(
    shapeClasses,
    colorClasses,
    "transition-colors relative"
  );

  const ButtonComponent = as || "button";

  return (
    <ButtonComponent
      {...props}
      className={clsx(
        className,
        colorClassMap[color].borderClasses,
        "group relative"
      )}
    >
      {variant === "decorative" || variant === "fancy" ? (
        <div
          role="presentation"
          className={clsx(
            colorClassMap[color].decorativeBorderClasses,
            "absolute -inset-[3px] border"
          )}
        ></div>
      ) : null}
      {variant === "fancy" ? (
        <div
          role="presentation"
          className={clsx(
            colorClasses,
            colorClassMap[color].borderClasses,
            "absolute rotate-45 top-0 left-1/2 -translate-x-1/2 h-full aspect-square transition-colors"
          )}
        ></div>
      ) : null}
      <div className={clsx(classes, "relative text-shadow")}>{children}</div>
    </ButtonComponent>
  );
}
