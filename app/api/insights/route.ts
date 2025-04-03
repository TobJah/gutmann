import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";

console.log("✅ [API] /api/insights gestartet");
console.log("🔐 OPENAI_API_KEY vorhanden:", !!process.env.OPENAI_API_KEY);
console.log("🔐 NEWS_API_KEY vorhanden:", !!process.env.NEWS_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { portfolio } = await req.json();
    console.log("📦 Portfolio empfangen:", portfolio);

    // News holen
    const newsRes = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          domains: "bloomberg.com",
          from: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          sortBy: "publishedAt",
          language: "en",
          pageSize: 50,
          apiKey: process.env.NEWS_API_KEY,
        },
    });

    const news = newsRes.data.articles;
    console.log(`📰 ${news.length} Newsartikel geladen`);

    const newsText = news
      .map((n: any) => `• ${n.title} – ${n.description || ""}`)
      .join("\n");

    const prompt = `
Hier ist unser Depot: ${portfolio.join(", ")}.

Hier sind aktuelle Wirtschaftsnachrichten:

${newsText}

Kannst du die für unser Depot relevanten News für die Berater der Bank zusammenfassen. Bitte gib die wichtigsten Inhalte wieder in 5 Sätzen.
`;

    console.log("✉️ Prompt an GPT:", prompt.slice(0, 500), "...");

    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const answer = chat.choices[0].message?.content ?? "Keine Einschätzung verfügbar.";
    console.log("🤖 GPT Antwort erhalten:", answer);

    return NextResponse.json({
      insight: answer,
      usedNews: news.map((n: any) => ({ title: n.title })),
    });
  } catch (err: any) {
    console.error("❌ Fehler in /api/insights:", err);
    return NextResponse.json(
      { error: "Interner Serverfehler", detail: err?.message ?? "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
