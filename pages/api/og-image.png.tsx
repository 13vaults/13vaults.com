import SocialHero from "@/components/social-hero";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");

  const fontData = await fetch(
    new URL("../../assets/VollkornSC-Bold.ttf", import.meta.url)
  ).then((response) => response.arrayBuffer());

  return new ImageResponse(
    <SocialHero fontFamily="Vollkorn SC" title={title} />,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Vollkorn SC",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
