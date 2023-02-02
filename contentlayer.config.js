import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

const Monster = defineDocumentType(() => ({
  name: "Npc",
  filePathPattern: "monsters/*.yml",
  contentType: "data",
  fields: {
    name: { type: "string", required: true },
    system: { type: "json", required: true },
    items: { type: "list", of: { type: "json" }, required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.yml$/, ""),
    },
  },
}));

const ClassItem = defineDocumentType(() => ({
  name: "ClassItem",
  filePathPattern: "classes/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    source: { type: "string", required: true },
    quote: { type: "string", required: true },
    quote_source: { type: "string", required: true },
    lead: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: "vaults",
  documentTypes: [ClassItem, Monster],
  mdx: {
    remarkPlugins: [remarkGfm],
  },
});

export default contentLayerConfig;
