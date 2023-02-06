import clsx from "clsx";

export default function Container({ className, ...rest }: any) {
  return (
    <div
      className={clsx(
        "mx-auto 2xl:max-w-7xl xl:max-w-5xl max-w-4xl",
        className
      )}
      {...rest}
    ></div>
  );
}
