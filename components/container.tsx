import clsx from "clsx";

export default function Container({
  as: Element = "div",
  className,
  ...rest
}: any) {
  return (
    <Element
      className={clsx(
        "mx-auto 2xl:max-w-7xl xl:max-w-5xl max-w-4xl",
        className
      )}
      {...rest}
    ></Element>
  );
}
