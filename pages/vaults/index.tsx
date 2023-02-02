import { DetailedHTMLProps, HTMLAttributes } from "react";
import { MDXProvider } from "@mdx-js/react";

export default function ClassesIndex(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const mdxComponents = {
    Image: ({ source, alt }: any) => (
      <img
        src={source}
        alt={alt}
        className="float-right hidden w-60 md:inline-block"
      />
    ),
    Header: ({ title, source }: any) => (
      <hgroup>
        <h1 className="my-0 text-4xl">{title}</h1>
        <p className="my-0 font-display italic text-black/50">{source}</p>
      </hgroup>
    ),
    Quote: ({ quote, source }: any) => (
      <figure>
        <blockquote>
          <p>{quote}</p>
        </blockquote>
        <figcaption>&ndash; {source}</figcaption>
      </figure>
    ),
    table: ({ children }: any) => (
      <div className="overflow-auto">
        <table>{children}</table>
      </div>
    ),
  };
  return (
    <MDXProvider components={mdxComponents}>
      <main {...props} />
    </MDXProvider>
  );
}

ClassesIndex.getLayout = function getLayout() {
  return null;
};
