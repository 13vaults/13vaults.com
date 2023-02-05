import { allClassItems } from "contentlayer/generated";
import { map, pick } from "lodash";
import { GetStaticPropsResult } from "next";
import Link from "next/link";
import CompendiumCategoryIndexLayout from "@/layouts/compendium-category-index";
import Head from "next/head";

interface ClassesPageP {
  classItems: {
    slug: string;
    name: string;
  }[];
}

export default function AncestriesPage({ classItems }: ClassesPageP) {
  return (
    <>
      <Head>
        <title>Classes - The 13 Vaults</title>
      </Head>
      <CompendiumCategoryIndexLayout>
        <ul>
          {map(classItems, (classItem) => (
            <li key={classItem.slug}>
              <Link href={`/compendium/classes/${classItem.slug}`}>
                {classItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </CompendiumCategoryIndexLayout>
    </>
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
