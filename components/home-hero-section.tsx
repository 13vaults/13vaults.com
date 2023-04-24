import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/images/camelot-spire-butteredbap.webp";
import Container from "./container";

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
        <h1 className="text-stone-50">
          <span className="sr-only">13 Vaults</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-12 md:h-16 mx-auto drop-shadow"
            viewBox="0 0 152 34"
          >
            <path
              fillRule="evenodd"
              d="m56 30.7 1.3-4.6-1.5-4.3h3.6l3-8.3-3-2.2h12.3l4.8 12.3h1l1.1 7.1h-6l-1.4-4h-7.6l-1.2 4H56Zm9.5-8.9h4.1l-1.8-5.4h-.6l-1.7 5.4Zm24 9.2c-3.3 0-5.6-.6-7-2-1.5-1.2-2.2-3.3-2.2-6.2v-7.1l-2-4.4h8.3v10.2l.1 2.2c.2.7.5 1.2.9 1.5.4.4 1 .6 2 .6a4 4 0 0 0 2-.5c.3-.3.6-.8.8-1.5l.1-2.3v-5.8l-2-4.4h8.2v11.5c0 2-.3 3.4-1 4.7-.6 1.1-1.6 2-2.9 2.6a13 13 0 0 1-5.3.9Zm12.8-.3-2.8-5.5 2.8 1.1v-9.8l-.8.3.8-5.5h6.1l2.1-.3-2 5.5v5.2l-.4 3.8h.6l5.8 1.5 1.2-2 2.4 4-1.3 1.7h-14.5Zm18.7 0V16.5l-5.7.3-1.3-6.3 1.3.8h17.5l1.2 6.3-1.2-.8-5.7-.3v9.8l1.4-.3-1.4 4.7h-6.2Z"
            />
            <path
              fillRule="evenodd"
              d="M142.4 31a17 17 0 0 1-5.7-1 4 4 0 0 1-1.6-.8v-2.9l-2.9-4 2.9 1.2a16.7 16.7 0 0 0 7.6 2c1.1 0 1.7-.2 1.7-.7a1 1 0 0 0-.3-.7l-1.2-.5-2.5-.8-3.2-1.2c-.8-.4-1.5-1-2-1.6-.4-.7-.6-1.6-.6-2.7 0-1.9.8-3.4 2.3-4.6 1.6-1.1 3.8-1.7 6.8-1.7a23.3 23.3 0 0 1 3.5.2l4.3-.7-2.2 2.5v4.7l-7.2-1.8c-.7 0-1 .3-1 .8 0 .3.1.7.6 1l2.6 1c1.7.5 3 1 4 1.6A5 5 0 0 1 151 25a5.7 5.7 0 0 1-2.2 4.4 10.7 10.7 0 0 1-6.5 1.7ZM3.7 30.7V16.9l1-3-2.8.7H0v-5l9.5-1.3.3 1.9-.3 3.1.5 13.9-.5 3.5H3.7Zm16.7.3a27.2 27.2 0 0 1-3.6-.3L13 29l-.4-6.8 2 1.8 6.2 1.8c1.2 0 2-.2 2.6-.6.5-.5.8-1 .8-1.6 0-.6-.2-1-.6-1.2-.4-.3-1-.4-2-.4h-3.8l-4-5h7.5c.7 0 1.2-.2 1.6-.5.5-.3.7-.7.7-1.3 0-.6-.2-1-.6-1.3a3 3 0 0 0-1.7-.5 13.8 13.8 0 0 0-5.5 1.1l-1.9.7-2.6-5.8 2.6.5a16 16 0 0 1 4.6-1.5c1-.2 2.2-.3 3.5-.3 2.3 0 4 .5 5.3 1.6 1.2 1 1.8 2.5 1.8 4.4a5 5 0 0 1-.7 2.7 6 6 0 0 1-1.4 1.7 5.2 5.2 0 0 1 3 5c.1 5-3.1 7.6-9.5 7.6Zm17.9 3-7.8-22.6.4-3.3-1.7-3.2L26 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L47 1.6h9.8L60 5l-3 6.5L49.5 34H38.3Z"
            />
          </svg>
        </h1>
        <div className="prose prose-invert prose-p:my-1 prose-p:text-justify prose-p:leading-tight prose-p:text-stone-50 font-serif font-bold">
          <p>{t("intro")}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:mx-auto">
          <Link
            className="relative group flex gap-3 justify-center focus:bg-teal-600 hover:bg-teal-600 bg-teal-700 border border-teal-400/50 hover:border-teal-400 ps-8 pe-12 py-3 shadow transition-colors font-display font-semibold items-center"
            href="/compendium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-5 w-5"
              viewBox="0 0 34 34"
            >
              <path
                fillRule="evenodd"
                d="M12.3 34 4.5 11.4 5 8.1 3.2 4.9 0 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L21 1.6h9.8L34 5l-3 6.5L23.5 34H12.3Z"
              />
            </svg>
            <span>{t("cta-label")}</span>
            <div className="border border-teal-600 absolute -inset-1"></div>
          </Link>
          <a
            className="relative group flex gap-3 justify-center focus:bg-indigo-600/50 hover:bg-indigo-600/50 bg-indigo-600/20 border border-indigo-500/50 hover:border-indigo-500 ps-8 pe-12 py-3 shadow transition-colors font-display font-semibold items-center"
            href="https://discord.gg/m9DbPC6RsC"
          >
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
            <span>{t("join-discord-label")}</span>
            <div className="border border-indigo-600 absolute -inset-1 group-hover:border-indigo-500"></div>
          </a>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <Container>
          <p className="text-sm text-stone-600">
            <a href="https://www.deviantart.com/butteredbap/art/Camelot-spire-358955566">
              {t("image-cite")}
            </a>
          </p>
        </Container>
      </div>
    </section>
  );
}