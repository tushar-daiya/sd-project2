import SearchBar from "@/components/SearchBar";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";
async function fetchSearchResults(query: string, mode: string, id: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  await prisma.searchQuery.create({
    data: {
      queryText: query,
      model: mode,
      userId: id,
    },
  });
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(query);
  return result.response.text();
}

async function fetchFunnySearchResults(query: string, mode: string) {
  let prompt;
  if (mode === "work") {
    prompt =
      "Reply with a short quirky, funny, and casual response to the following query: " +
      query +
      " Make it witty, lighthearted, and slightly unexpected, like a humorous friend texting back. Feel free to add a playful twist, sarcasm, or an over-the-top reaction to keep it entertaining";
  } else if (mode === "casual") {
    prompt =
      "Reply with a short super serious, strict, and authoritative scolding response to the following query:" +
      query +
      " Channel the tone of a stern teacher, a no-nonsense boss, or a disappointed parent. Make it firm, borderline dramatic, and filled with a sense of urgency or consequence. Emphasize discipline, responsibility, and the weight of the situation, ensuring the recipient feels properly chastised";
  } else {
    prompt =
      "Reply with a short hilarious roast to the following query:" +
      query +
      " Make it witty, sharp, and playful, like a stand-up comedian delivering the perfect comeback. Keep it lighthearted but savage, balancing humor with clever insults. Feel free to exaggerate, use creative metaphors, and sprinkle in some sarcasm for maximum comedic effect. The goal is to make the recipient laugh while feeling just the right amount of roasted";
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
export default async function page(props: {
  searchParams?: Promise<{
    mode: string;
    query: string;
  }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const searchParams = await props.searchParams;
  const mode = searchParams?.mode || "work";
  const query = searchParams?.query || "";
  let data1;
  let data2;
  let loading = false;
  if (query && mode) {
    loading = true;
    data1 = await fetchSearchResults(query, mode, session?.user?.id as string);
    data2 = await fetchFunnySearchResults(query, mode);
    loading = false;
  }

  return (
    <div className="w-full">
      <div className="py-20 mx-auto max-w-3xl">
        <SearchBar />
      </div>
      <div className="py-20 mx-auto max-w-3xl">
        {loading && <div>Loading...</div>}
        {data2 && <Markdown>{data2}</Markdown>}
        <br />
        <br />
        <hr />
        <br />
        <br />

        {data1 && <Markdown>{data1}</Markdown>}
      </div>
    </div>
  );
}
