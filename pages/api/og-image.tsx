import { allBlogPosts } from "@/.contentlayer/generated";
import SocialHero from "@/components/social-hero";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const allowedTitles = allBlogPosts.map((post) => post.title);
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");
  const hero = Boolean(searchParams.get("hero"));

  if (title && allowedTitles.includes(title)) {
    const fontData = await fetch(
      new URL("../../assets/VollkornSC-Bold.ttf", import.meta.url)
    ).then((response) => response.arrayBuffer());

    return new ImageResponse(
      <SocialHero fontFamily="Vollkorn SC" title={title} hero={hero} />,
      {
        width: hero ? 1280 : 800,
        height: hero ? 640 : 400,
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
  } else {
    return new Response("Invalid title", { status: 400 });
  }
}
