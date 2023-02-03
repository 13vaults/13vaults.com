import * as Vault from "@/components/vault";
import VaultLayout from "@/layouts/vault";
import { useMDXComponent } from "next-contentlayer/hooks";
import VaultHeader from "./vault-header";

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
  return (
    <VaultLayout>
      <VaultHeader
        primaryLabel={primaryLabel}
        secondaryLabel={secondaryLabel}
      />
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
