import * as Vault from "@/components/vault";
import VaultLayout from "@/layouts/vault";
import { get } from "lodash";
import { useMDXComponent } from "next-contentlayer/hooks";
import VaultHeader from "./compendium-header";

interface ContentLayerRendererP {
  data: any;
  primaryLabel: string;
  secondaryLabel: string;
}

export default function ContentLayerPage({
  data,
  primaryLabel,
  secondaryLabel,
}: ContentLayerRendererP) {
  const Content = useMDXComponent(data.body.code);
  const pageDress = get(data, "page_dress");
  const quote = get(pageDress, "quote");
  return (
    <VaultLayout>
      <VaultHeader
        primaryLabel={primaryLabel}
        secondaryLabel={secondaryLabel}
      />
      {quote ? (
        <figure>
          <blockquote>
            <p>{quote.text}</p>
          </blockquote>
          <figcaption>&ndash; {quote.cite}</figcaption>
        </figure>
      ) : null}
      <Content
        data={data}
        components={{
          Vault: Vault,
          table: ({ children }: any) => (
            <div className="overflow-auto">
              <table>{children}</table>
            </div>
          ),
        }}
      />
    </VaultLayout>
  );
}
