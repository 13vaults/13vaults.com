import SocialHero from "@/components/social-hero";
import { NextRequest, ImageResponse } from "next/server";

export const config = {
  runtime: "edge",
};

const vaultsUrl = process.env.VAULTS_URL || "https://www.13vaults.com";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  const url = new URL("/api/valid-og-image-title", vaultsUrl);

  if (title) {
    url.searchParams.append("title", title);

    const isValidTitle = (await fetch(url).then((result) =>
      result.json()
    )) as boolean;

    if (isValidTitle) {
      const fontData = await fetch(
        new URL("../../../public/fonts/IkariusADFStd-Bold.otf", import.meta.url)
      ).then((response) => response.arrayBuffer());

      return new ImageResponse(
        <SocialHero fontFamily="Ikarius" title={title} />,
        {
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
        }
      );
    } else {
      return new Response("Invalid title.", { status: 400 });
    }
  } else {
    return new Response("Title is required.", { status: 400 });
  }
}
