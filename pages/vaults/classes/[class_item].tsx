import { allClassItems, ClassItem } from "contentlayer/generated";
import { flow, find, map, get } from "lodash";
import { useMDXComponent } from "next-contentlayer/hooks";
import VaultLayout from "@/layouts/vault";
import * as Vault from "@/components/vault";
import { GetStaticPropsResult, NextPageContext } from "next";

interface ClassPageP {
  classItem: ClassItem;
}

export default function ClassPage({ classItem }: ClassPageP) {
  const MDXContent = useMDXComponent(classItem.body.code);
  return (
    <VaultLayout>
      <hgroup className="not-prose">
        <h1 className="my-0 font-serif font-bold text-4xl">
          {classItem.title}
        </h1>
        <p className="my-0 font-display italic text-black/50">
          {classItem.source}
        </p>
      </hgroup>
      <Vault.Quote text={classItem.quote} source={classItem.quote_source} />
      <p className="lead">{classItem.lead}</p>
      <MDXContent
        classItem={classItem}
        components={{
          Vault: Vault,
          table: ({ children }) => (
            <div className="overflow-auto">
              <table>{children}</table>
            </div>
          ),
        }}
      />
    </VaultLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: map(allClassItems, (classItem) => ({
      params: { slug: classItem.slug, class_item: classItem.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: NextPageContext
): Promise<GetStaticPropsResult<ClassPageP>> {
  const classItem = flow((classes) =>
    find(classes, ["slug", get(context, "params.class_item")])
  )(allClassItems);

  return {
    props: {
      classItem,
    },
  };
}
