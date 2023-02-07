import * as Vault from "@/components/vault";
import VaultLayout from "@/layouts/vault";
import { get } from "lodash";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import VaultHeader from "./compendium-header";
import { Navigation } from "@/lib/navigation";
import Heading from "./heading";
import { SectionProvider } from "./section-provider";
import CompendiumSideNav from "./compendium-side-nav";

interface ContentLayerRendererP {
  data: any;
  primaryLabel: string;
  secondaryLabel: string;
  navigation: Navigation;
}

export default function ContentLayerPage({
  data,
  primaryLabel,
  secondaryLabel,
  navigation,
}: ContentLayerRendererP) {
  const Content = useMDXComponent(data.body.code);
  const pageDress = get(data, "page_dress");
  const quote = get(pageDress, "quote");
  const title = `${primaryLabel} - 13 Vaults`;
  const sections = get(data, "sections", []);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SectionProvider sections={sections}>
        <VaultLayout
          navigation={navigation}
          sideNavigation={<CompendiumSideNav primaryLabel={primaryLabel} />}
        >
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
          <hr className="my-8 dark:border-stone-700" />
          <Content
            data={data}
            components={{
              Vault: Vault,
              h2: ({ id, children, ...rest }) => (
                <Heading level={2} id={id!} headingProps={rest}>
                  {children}
                </Heading>
              ),
              h3: ({ id, children, ...rest }) => (
                <Heading level={3} id={id!} headingProps={rest}>
                  {children}
                </Heading>
              ),
              h4: ({ id, children, ...rest }) => (
                <Heading level={4} id={id!} headingProps={rest}>
                  {children}
                </Heading>
              ),
              h5: ({ id, children, ...rest }) => (
                <Heading level={5} id={id!} headingProps={rest}>
                  {children}
                </Heading>
              ),
              h6: ({ id, children, ...rest }) => (
                <Heading level={6} id={id!} headingProps={rest}>
                  {children}
                </Heading>
              ),
              table: (props: any) => (
                <div className="overflow-auto">
                  <table {...props} />
                </div>
              ),
            }}
          />
        </VaultLayout>
      </SectionProvider>
    </>
  );
}
