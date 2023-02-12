import clsx from "clsx";

export { default as AbilityList } from "./compendium-ability";
export { default as CompendiumFeats } from "./compendium-feats";

export function Dice({ className = "", ...properties }: any) {
  return (
    <span
      className={clsx("bg-red-500 text-white", className)}
      {...properties}
    />
  );
}

export function TwoCol({ className = "", ...properties }: any) {
  return (
    <div
      className={clsx("lg:grid lg:grid-cols-2 lg:gap-4", className)}
      {...properties}
    />
  );
}

export function ThreeCol({ className = "", ...properties }: any) {
  return (
    <div
      className={clsx("lg:grid lg:grid-cols-2 lg:gap-4", className)}
      {...properties}
    />
  );
}

export function Col1({ className = "", ...properties }: any) {
  return <div className={clsx("lg:col-span-1", className)} {...properties} />;
}

export function Col2({ className = "", ...properties }: any) {
  return <div className={clsx("lg:col-span-2", className)} {...properties} />;
}

export function Col3({ className = "", ...properties }: any) {
  return <div className={clsx("lg:col-span-3", className)} {...properties} />;
}

export function Center({ className = "", ...properties }: any) {
  return (
    <div className={clsx("not-prose text-center", className)} {...properties} />
  );
}
