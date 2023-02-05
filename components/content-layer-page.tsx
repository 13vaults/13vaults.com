import * as Vault from "@/components/vault";
import VaultLayout from "@/layouts/vault";
import { get } from "lodash";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import CompendiumFeats from "./compendium-feats";
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
    <>
      <Head>
        <title>{primaryLabel} - 13Vaults</title>
      </Head>
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
        <hr className="my-8" />
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
    </>
  );
}
