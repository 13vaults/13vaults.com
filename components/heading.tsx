import clsx from "clsx";
import { ReactNode, SVGProps, useEffect, useRef } from "react";
import { useSectionStore } from "./section-provider";

function AnchorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3" />
    </svg>
  );
}

interface HeadingP {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id: string;
  children: ReactNode;
  headingProps: any;
}

export default function Heading({
  level,
  headingProps,
  id,
  children,
}: HeadingP) {
  const Component = `h${level}`;
  const ref = useRef<Element>(null);
  const registerHeading = useSectionStore((s: any) => s.registerHeading);

  useEffect(() => {
    if (level === 2) {
      registerHeading({ id, ref, offsetRem: 10 });
    }
  }, [id, level, registerHeading]);

  const { className, ...restHeadingProps } = headingProps;

  return (
    <Component
      id={id}
      ref={ref}
      className={clsx("scroll-mt-4 lg:scroll-mt-24", className)}
      {...restHeadingProps}
    >
      {children}
    </Component>
  );
}
