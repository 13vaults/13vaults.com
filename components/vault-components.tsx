import clsx from "clsx";

export { default as AbilityList } from "./compendium-ability";
export { default as CompendiumFeats } from "./compendium-feats";

export function Dice({ className = "", ...props }: any) {
  return (
    <span className={clsx("bg-red-500 text-white", className)} {...props} />
  );
}

export function TwoCol({ className = "", ...props }: any) {
  return (
    <div
      className={clsx("lg:grid lg:grid-cols-2 lg:gap-4", className)}
      {...props}
    />
  );
}

export function ThreeCol({ className = "", ...props }: any) {
  return (
    <div
      className={clsx("lg:grid lg:grid-cols-2 lg:gap-4", className)}
      {...props}
    />
  );
}

export function Col1({ className = "", ...props }: any) {
  return <div className={clsx("lg:col-span-1", className)} {...props} />;
}

export function Col2({ className = "", ...props }: any) {
  return <div className={clsx("lg:col-span-2", className)} {...props} />;
}

export function Col3({ className = "", ...props }: any) {
  return <div className={clsx("lg:col-span-3", className)} {...props} />;
}

export function Center({ className = "", ...props }: any) {
  return (
    <div className={clsx("not-prose text-center", className)} {...props} />
  );
}
