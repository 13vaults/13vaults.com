import { allClassItems, ClassItem } from "contentlayer/generated";
import { map } from "lodash";
import { GetStaticPropsResult } from "next";
import Link from "next/link";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";

interface ClassesPageP {
  classItems: ClassItem[];
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
      classItems: allClassItems,
    },
  };
}
