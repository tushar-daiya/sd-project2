import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { getJson } from "serpapi";
export async function GET(req: NextRequest) {
  const session = await auth();
  console.log(session);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const mode = searchParams.get("mode");
  if (!query || !mode) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }
  //todo: increase user roast level
  //todo: add user to the leaderboard
  //add search to the database
  const json = await getJson({
    engine: "google",
    q: query,
    api_key: process.env.SERPAPI_API_KEY,
    location: "India",
  });
  return NextResponse.json(
    {
      message: "Success",
      data: json["organic_results"],
    },
    { status: 200 }
  );
}
