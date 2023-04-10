import Link from "next/link";
import { ComponentProps } from "react";

export default function ContentLink({
  href,
  ...properties
}: ComponentProps<typeof Link>) {
  return <Link href={href} {...properties} />;
}
