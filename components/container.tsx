import clsx from "clsx";

interface ContainerP extends JSX.IntrinsicAttributes {
  as?: keyof JSX.IntrinsicElements;
  maxWidth?: string;
  maxWidthXl?: string;
  maxWidth2xl?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Container({
  as: Element = "div",
  maxWidth = "max-w-4xl",
  maxWidthXl = "max-w-5xl",
  maxWidth2xl = "max-w-7xl",
  className,
  ...rest
}: ContainerP) {
  return (
    <Element
      className={clsx("mx-auto", maxWidth, maxWidthXl, maxWidth2xl, className)}
      {...rest}
    ></Element>
  );
}
