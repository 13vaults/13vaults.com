import clsx from "clsx";
import React from "react";

type LabelRole = "display" | "headline" | "title" | "label" | "body";

type LabelSize = "small" | "large";

type LabelVariant = `${LabelRole}-${LabelSize}` | LabelRole;

interface LabelP<T extends React.ElementType> {
  variant?: LabelVariant;
  as?: T;
}

export default function Label<T extends React.ElementType = "p">({
  as,
  variant = "body",
  className,
  ...props
}: LabelP<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof LabelP<T>>) {
  const LabelComponent = as || "p";

  const variantStyleMap = new Map<typeof variant, string>()
    .set(
      "display-large",
      "text-7xl font-bold font-display-serif tracking-tighter uppercase"
    )
    .set(
      "display",
      "text-6xl font-bold font-display-serif tracking-tighter uppercase"
    )
    .set(
      "display-small",
      "text-5xl font-bold font-display-serif tracking-tighter uppercase"
    )
    .set("headline-large", "text-5xl font-light font-display-serif")
    .set("headline", "text-4xl font-light font-display-serif")
    .set("headline-small", "text-3xl font-light font-display-serif")
    .set("title-large", "text-3xl font-medium font-serif")
    .set("title", "text-2xl font-medium font-serif tracking-tight")
    .set("title-small", "text-xl font-medium font-serif tracking-tighter")
    .set("label-large", "text-xl font-semibold")
    .set("label", "text-lg font-semibold tracking-tight")
    .set("label-small", "text-base font-semibold tracking-tighter")
    .set("body-large", "text-lg font-normal")
    .set("body", "text-base font-normal")
    .set("body-small", "text-sm font-normal");

  const classes = clsx(className, variantStyleMap.get(variant));

  return <LabelComponent className={classes} {...props} />;
}
