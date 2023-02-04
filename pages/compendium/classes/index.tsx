import { allClassItems } from "contentlayer/generated";
import { map, pick } from "lodash";
import { GetStaticPropsResult } from "next";
import Link from "next/link";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";

interface ClassesPageP {
  classItems: {
    slug: string;
    name: string;
  }[];
}

export default function AncestriesPage({ classItems }: ClassesPageP) {
  return (
    <CompendiumCategoryIndexLayout>
      <ul>
        {map(classItems, (classItem) => (
          <li>
            <Link href={`/compendium/classes/${classItem.slug}`}>
              {classItem.name}
            </Link>
          </li>
        ))}
      </ul>
    </CompendiumCategoryIndexLayout>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<ClassesPageP>
> {
  return {
    props: {
      classItems: map(allClassItems, (classItem) =>
        pick(classItem, ["slug", "name"])
      ),
    },
  };
}
