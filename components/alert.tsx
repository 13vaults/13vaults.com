import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { ElementType } from "react";

type AlertVariant = "notice" | "caution" | "danger" | "success" | "info";

interface AlertP {
  title?: string;
  variant: AlertVariant;
  children?: JSX.Element | null;
  icon?: ElementType;
  showIcon: boolean;
}

const variantClassMap: Record<
  AlertVariant,
  {
    bgColor: string;
    proseModifiers: string;
    textColorStrong: string;
    iconColor: string;
  }
> = {
  caution: {
    bgColor:
      "bg-yellow-50 dark:bg-yellow-900/75 border-yellow-300 dark:border-yellow-600",
    proseModifiers:
      "text-yellow-700 dark:text-yellow-100 prose-yellow hover:prose-a:text-yellow-800",
    textColorStrong: "text-yellow-800 dark:text-yellow-200",
    iconColor: "text-yellow-500 dark:text-yellow-300",
  },
  danger: {
    bgColor: "bg-red-50 dark:bg-red-900/75 border-red-300 dark:border-red-600",
    proseModifiers:
      "text-red-700 dark:text-red-100 prose-red hover:prose-a:text-red-800",
    textColorStrong: "text-red-800 dark:text-red-200",
    iconColor: "text-red-500 dark:text-red-300",
  },
  success: {
    bgColor:
      "bg-emerald-50 dark:bg-emerald-900/75 border-emerald-300 dark:border-emerald-600",
    proseModifiers:
      "text-emerald-700 dark:text-emerald-100 prose-emerald hover:prose-a:text-emerald-800",
    textColorStrong: "text-emerald-800 dark:text-emerald-200",
    iconColor: "text-emerald-500 dark:text-emerald-300",
  },
  notice: {
    bgColor:
      "bg-teal-50 dark:bg-teal-900/75 border-teal-300 dark:border-teal-600",
    proseModifiers:
      "text-teal-700 dark:text-teal-100 prose-teal hover:prose-a:text-teal-800",
    textColorStrong: "text-teal-800 dark:text-teal-200",
    iconColor: "text-teal-500 dark:text-teal-300",
  },
  info: {
    bgColor: "bg-sky-50 dark:bg-sky-900/75 border-sky-300 dark:border-sky-600",
    proseModifiers:
      "text-sky-700 dark:text-sky-100 prose-sky hover:prose-a:text-sky-800",
    textColorStrong: "text-sky-800 dark:text-sky-200",
    iconColor: "text-sky-500 dark:text-sky-300",
  },
};

const variantIconMap: Record<AlertVariant, ElementType> = {
  caution: ExclamationTriangleIcon,
  danger: XCircleIcon,
  success: CheckCircleIcon,
  info: InformationCircleIcon,
  notice: BellIcon,
};

export default function Alert({
  title,
  icon,
  showIcon = true,
  variant = "notice",
  children = null,
}: AlertP) {
  const classes = variantClassMap[variant];
  const Icon = icon || variantIconMap[variant];
  return (
    <div
      className={clsx("border-2 rounded-md shadow px-4 py-2", classes.bgColor)}
    >
      <div className="flex">
        {showIcon ? (
          <div className="flex-shrink-0 mt-2">
            <Icon
              className={clsx("h-5 w-5", classes.iconColor)}
              aria-hidden="true"
            />
          </div>
        ) : null}
        <div className="ml-3">
          {title ? (
            <p
              className={clsx(
                "font-medium mb-0 mx-0 mt-2",
                classes.textColorStrong
              )}
            >
              {title}
            </p>
          ) : null}
          <div
            className={clsx(
              "mt-2 prose max-w-none prose-p:my-2",
              classes.proseModifiers
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
