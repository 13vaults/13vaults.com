import { allBlogPosts } from "@/.contentlayer/generated";
import SocialHero from "@/components/social-hero";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const allowedTitles = new Set(allBlogPosts.map((post) => post.title));

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");

  if (title && allowedTitles.has(title)) {
    const fontData = await fetch(
      new URL("../../assets/VollkornSC-Bold.ttf", import.meta.url)
    ).then((response) => response.arrayBuffer());

    return new ImageResponse(
      <SocialHero fontFamily="Vollkorn SC" title={title} />,
      {
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
      }
    );
  } else {
    return new Response("Invalid title", { status: 400 });
  }
}
