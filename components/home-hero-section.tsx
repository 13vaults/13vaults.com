import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/images/camelot-spire-butteredbap.webp";
import Container from "./container";
import VaultsLogo from "./vaults-logo";
import Button from "./button";

export default function HomeHeroSection() {
  const { t } = useTranslation("home");

  return (
    <section className="flex-1 relative min-h-[40vh] text-white flex flex-col bg-cover bg-top">
      <Image
        className="relative object-top object-cover h-full w-full"
        fill
        src={heroImage}
        alt="Dragon flying near a tower."
        placeholder="blur"
        unoptimized={process.env.NODE_ENV === "development"}
        priority
      />
      <div className="relative flex-1 flex flex-col gap-12 px-4 py-8 lg:p-8 pb-14 w-full mx-auto justify-center items-center bg-gradient-to-t from-stone-950 to-stone-950/50">
        <div className="absolute bottom-4 left-4 right-4">
          <Container>
            <a
              className="text-sm text-stone-600"
              href="https://www.deviantart.com/butteredbap/art/Camelot-spire-358955566"
            >
              {t("image-cite")}
            </a>
          </Container>
        </div>
        <h1 className="text-stone-50">
          <span className="sr-only">13 Vaults</span>
          <VaultsLogo
            variant="full"
            className="h-12 md:h-16 mx-auto drop-shadow"
          />
        </h1>
        <div className="prose prose-invert prose-p:my-1 prose-p:text-justify prose-p:leading-tight prose-p:text-stone-50 font-serif font-medium">
          <p>{t("intro")}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:mx-auto">
          <Button
            as={Link}
            href="/compendium"
            size="large"
            variant="decorative"
            className="inline-block shadow font-bold font-display-serif"
          >
            <div className="flex gap-3 justify-center items-center">
              <VaultsLogo variant="tiny" className="h-5 w-5" />
              {t("cta-label")}
            </div>
          </Button>
          <Button
            as="a"
            href="https://discord.gg/m9DbPC6RsC"
            size="large"
            color="secondary"
            variant="decorative"
            className="inline-block shadow font-bold font-display-serif"
          >
            <div className="flex gap-3 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 127.14 96.36"
                className="h-5 w-5"
                fill="currentColor"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                  />
                </g>
              </svg>
              {t("join-discord-label")}
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
}
