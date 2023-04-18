import { BlogPost } from "@/.contentlayer/generated";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { PickPartial } from "@/utils";
import Link from "next/link";
dayjs.extend(utc);
dayjs.extend(localizedFormat);

type BlogPostItem = PickPartial<
  BlogPost,
  "excerpt" | "date" | "title" | "slug" | "published"
>;

type HomeNewsSectionItemP = BlogPostItem & {};

export default function HomeNewsSectionItem({
  slug,
  title,
}: HomeNewsSectionItemP) {
  return <Link href={`/blog/${slug}`}>{title}</Link>;
}
