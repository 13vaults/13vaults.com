import {
  defineDocumentType,
  makeSource,
  defineNestedType,
} from "contentlayer/source-files";
import remarkGfm from "remark-gfm";

const PageDressQuote = defineDocumentType(() => ({
  name: "PageDressQuote",
  fields: {
    text: { type: "string", required: true },
    cite: { type: "string", required: true },
  },
}));

const PageDress = defineNestedType(() => ({
  name: "PageDress",
  fields: {
    quote: { type: "nested", of: PageDressQuote, required: false },
    lead: { type: "string", required: false },
  },
}));

const Monster = defineDocumentType(() => ({
  name: "Npc",
  filePathPattern: "1e/monsters/*.yml",
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

const Ancestry = defineDocumentType(() => ({
  name: "Ancestry",
  filePathPattern: "1e/ancestries/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    source: { type: "string", required: true },
    page_dress: { type: "nested", of: PageDress, required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

const ClassItem = defineDocumentType(() => ({
  name: "ClassItem",
  filePathPattern: "1e/classes/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    source: { type: "string", required: true },
    page_dress: { type: "nested", of: PageDress, required: true },
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
  documentTypes: [ClassItem, Monster, Ancestry],
  mdx: {
    remarkPlugins: [remarkGfm],
  },
});

export default contentLayerConfig;
