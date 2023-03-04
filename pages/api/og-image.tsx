import SocialHero from "@/components/social-hero";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const fontData = await fetch(
    new URL("../../assets/VollkornSC-Bold.ttf", import.meta.url)
  ).then((response) => response.arrayBuffer());

  return new ImageResponse(<SocialHero fontFamily="Vollkorn SC" />, {
    width: 800,
    height: 400,
    fonts: [
      {
        name: "Vollkorn SC",
        data: fontData,
        style: "normal",
        weight: 700,
      },
    ],
  });
}
