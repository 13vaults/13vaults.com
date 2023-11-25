import * as Vault from "@/components/vault-components";
import VaultLayout from "@/layouts/vault";
import { filter, get, includes, intersectionWith } from "lodash-es";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import VaultHeader from "./compendium-header";
import { Navigation } from "@/lib/navigation";
import Heading from "./heading";
import { SectionProvider } from "./section-provider";
import CompendiumSideNav from "./compendium-side-nav";
import ContentLink from "./content-link";
import { defaultLocale } from "@/lib/locales";
import { useBookStore, isSourceEnabled } from "@/lib/books";

interface ContentLayerRendererP {
  data: any;
  primaryLabel: string;
  secondaryLabel: string;
  navigation: Navigation;
  goBackLabel: string;
  goBackLink: string;
}

export default function ContentLayerPage({
  data,
  primaryLabel,
  secondaryLabel,
  navigation,
  goBackLabel,
  goBackLink,
}: ContentLayerRendererP) {
  const Content = useMDXComponent(data.body.code);
  const pageDress = get(data, "page_dress");
  const locale = get(data, "locale", defaultLocale);
  const quote = get(pageDress, "quote");
  const title = `${primaryLabel} - 13 Vaults`;
  const sections = get(data, "sections", []);
  const bookstore = useBookStore();
  const lead = get(pageDress, "lead");
  const If = (props) => props.source && isSourceEnabled(bookstore, props.source) ?
                          props.children : null
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={
            lead ||
            "13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
          }
        />
        <meta property="og:locale" content={locale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content={
            lead ||
            "13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
          }
        />
        <meta
          name="twitter:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={
            lead ||
            "13 Vaults is an unofficial community-driven resource site for the 13th Age tabletop roleplaying game"
          }
        />
        <meta
          property="og:image"
          content="https://www.13vaults.com/images/13v-social-banner.jpg"
        />
      </Head>
      <SectionProvider sections={sections}>
        <VaultLayout
          navigation={navigation}
          sideNavigation={
            <CompendiumSideNav
              goBackLink={goBackLink}
              goBackLabel={goBackLabel}
              primaryLabel={primaryLabel}
            />
          }
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
          {pageDress ? (
            <hr className="my-8 border-stone-300 dark:border-stone-700" />
          ) : null}
          {lead ? <p className="lead text-lg">{lead}</p> : null}
          <Content
            data={data}
            getAbilities={(names: string[]) =>
              intersectionWith(
                get(data, "abilities"),
                names,
                (o: any, name) => o.name === name
              )
            }
            getAbilitiesByType={(type: string) =>
              filter(get(data, "abilities"), ["_type", type])
            }
            getAbilitiesByTypeAndTier={(type: string, tier: string) =>
              filter(get(data, "abilities"), {
                "_type": type, "tier": tier })
            }
            getAbilitiesByTypes={(types: string[]) =>
              filter(get(data, "abilities"), (ability) =>
                includes(types, get(ability, "_type"))
              )
            }
            getAbilitiesByTypesAndTier={(types: string[], tier: string) =>
              filter(get(data, "abilities"), (ability) =>
                includes(types, get(ability, "_type")) && ability["tier"] == tier)
            }
            isSourceEnabled = {(name:string) => isSourceEnabled(bookstore,name)}
            components={{
              Vault: Vault,
              If: If,
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
              a: ({ href, ...properties }: any) => (
                <ContentLink href={href} {...properties} />
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
              table: (properties: any) => (
                <div className="overflow-auto w-min max-w-full border dark:border-stone-700 rounded shadow bg-white dark:bg-stone-700 border-stone-300 my-2">
                  <table {...properties} />
                </div>
              ),
            }}
          />
        </VaultLayout>
      </SectionProvider>
    </>
  );
}
