import { allBlogPosts } from "@/.contentlayer/generated";
import { includes, map } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  const allBlogTitles = map(allBlogPosts, "title");

  return includes(allBlogTitles, title)
    ? NextResponse.json(true)
    : NextResponse.json(false, { status: 400 });
}
