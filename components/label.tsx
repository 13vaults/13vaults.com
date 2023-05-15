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

  const variantStyleMap: Record<LabelVariant, string> = {
    "display-large":
      "text-7xl font-bold font-display-serif tracking-tighter uppercase",
    display: "text-6xl font-bold font-display-serif tracking-tighter uppercase",
    "display-small":
      "text-5xl font-bold font-display-serif tracking-tighter uppercase",
    "headline-large": "text-5xl font-light font-display-serif",
    headline: "text-4xl font-light font-display-serif",
    "headline-small": "text-3xl font-light font-display-serif",
    "title-large": "text-3xl font-medium font-serif",
    title: "text-2xl font-medium font-serif tracking-tight",
    "title-small": "text-xl font-medium font-serif tracking-tighter",
    "label-large": "text-xl font-sans-sc font-semibold",
    label: "text-lg font-sans-sc font-semibold tracking-tight",
    "label-small": "text-base font-sans-sc font-semibold tracking-tighter",
    "body-large": "text-lg font-normal",
    body: "text-base font-normal",
    "body-small": "text-sm font-normal",
  };

  const classes = clsx(className, variantStyleMap[variant]);

  return <LabelComponent className={classes} {...props} />;
}
