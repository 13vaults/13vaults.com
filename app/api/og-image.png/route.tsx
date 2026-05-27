import SocialHero from "@/components/social-hero";
import { NextRequest, ImageResponse } from "next/server";

export const runtime = "edge";

const vaultsUrl = process.env.VAULTS_URL || "https://www.13vaults.com";

export async function GET(request: NextRequest) {
	const title = request.nextUrl.searchParams.get("title");

	if (!title) {
		return new Response("Title is required.", { status: 400 });
	}

	const validationUrl = new URL("/api/valid-og-image-title", vaultsUrl);
	validationUrl.searchParams.set("title", title);

	const isValidTitle = (await fetch(validationUrl).then((result) =>
		result.json(),
	)) as boolean;

	if (!isValidTitle) {
		return new Response("Invalid title.", { status: 400 });
	}

	const fontData = await fetch(
		new URL("/fonts/Reforma1969-Negra.otf", vaultsUrl),
	).then((response) => {
		if (!response.ok) {
			throw new Error(`Failed to load font: ${response.status}`);
		}

		return response.arrayBuffer();
	});

	return new ImageResponse(
		<SocialHero fontFamily="Reforma 1969" title={title} />,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Reforma 1969",
					data: fontData,
					style: "normal",
					weight: 700,
				},
			],
		},
	);
}
