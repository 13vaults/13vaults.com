import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";
import { useSectionStore } from "./section-provider";

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
  const reference = useRef<Element>(null);
  const registerHeading = useSectionStore((s: any) => s.registerHeading);
  const unregisterHeading = useSectionStore((s: any) => s.unregisterHeading);

  useEffect(() => {
    if (level === 2) {
      registerHeading({ id, ref: reference, offsetRem: 10 });
    }
    return (() => level === 2 ? unregisterHeading(id) : null)
  }, [id, level, registerHeading]);

  const { className, ...restHeadingProperties } = headingProps;

  return (
    <Component
      id={id}
      ref={reference}
      className={clsx("scroll-mt-16 lg:scroll-mt-20", className)}
      {...restHeadingProperties}
    >
      {children}
    </Component>
  );
}
