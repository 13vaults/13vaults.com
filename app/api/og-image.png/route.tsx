import SocialHero from "@/components/social-hero";
import { NextRequest, ImageResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");

  const fontData = await fetch(
    new URL("../../../assets/IkariusADFStd-Bold.otf", import.meta.url)
  ).then((response) => response.arrayBuffer());

  return new ImageResponse(<SocialHero fontFamily="Ikarius" title={title} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Ikarius",
        data: fontData,
        style: "normal",
        weight: 700,
      },
    ],
  });
}
