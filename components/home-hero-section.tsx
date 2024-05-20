import { useTranslation } from "next-i18next";
import Image from "next/image";
import heroImage from "@/public/images/camelot-spire-butteredbap.webp";
import Container from "./container";
import VaultsLogo from "./vaults-logo";
import HomeHeroNavSection from "./home-hero-nav-section";

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
      <div className="relative flex-1 flex flex-col gap-12 px-4 py-8 lg:p-8 w-full mx-auto justify-center items-center bg-gradient-to-t from-stone-950 to-stone-950/50">
        <h1 className="text-stone-50">
          <span className="sr-only">13 Vaults</span>
          <VaultsLogo
            variant="full"
            className="h-12 md:h-16 mx-auto drop-shadow"
          />
        </h1>
        <div className="w-full">
          <HomeHeroNavSection />
        </div>
        <div className="w-full">
          <Container>
            <a
              className="text-sm text-stone-600/80"
              href="https://www.deviantart.com/butteredbap/art/Camelot-spire-358955566"
            >
              {t("image-cite")}
            </a>
          </Container>
        </div>
      </div>
    </section>
  );
}
